import React, { useEffect, useState } from 'react';
import style from 'src/components/form/cart/CartCustomer.module.scss';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import { createApiRoot, createLoginApiRoot } from 'src/services/api/BuildClient.ts';
import {
  Cart,
  CentPrecisionMoney,
  ClientResponse,
  LineItem,
  LocalizedString,
} from '@commercetools/platform-sdk';
import useModalEffect from 'src/components/form/profile/UseModalEffect.ts';
import { Message } from 'src/components/cartMessage/CartMessage.tsx';
import Modal from 'src/components/modalWindow/confirmationModal.tsx';


export const CartCustomer: React.FC = () => {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<CentPrecisionMoney>();
  const [cartVersion, setCartVersion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [api] = useState(localStorage.getItem('fullID') ? createLoginApiRoot() : createApiRoot());
  const [id] = useState(localStorage.getItem('cartId') ?? '');
  const [showModal, setShowModal] = useState(false);

  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);
  useModalEffect(modalData, setModalData);

  const proceedExceptions = (error: unknown, message: string) => {
    if (error instanceof ServerError) {
      setModalData({ status: 'Error', message: error.message });
    } else if (error instanceof Error) {
      setModalData({ status: 'Error', message: error.message });
    } else {
      setModalData({ status: 'Error', message });
    }
  };

  useEffect(() => {
    if (id) {
      const getCartItems = async () => {
        try {
          const cartCustomer: ClientResponse<Cart> = await api
            .carts()
            .withId({ ID: id })
            .get()
            .execute();
          setCartItems(cartCustomer.body.lineItems);
          setTotalPrice(cartCustomer.body.totalPrice);
          setCartVersion(cartCustomer.body.version);
          setIsLoading(false);
        } catch (error) {
          proceedExceptions(error, 'Could not retrieve customer items from carts');
        }
      };

      getCartItems().catch((errors: unknown) => {
        proceedExceptions(errors, 'Could not retrieve customer items from carts');
      });
    }
  }, [api, id]);

  const handleDelete = async (lineItemId: string) => {
    if (id) {
      try {
        const updatedCart: ClientResponse<Cart> = await api
          .carts()
          .withId({ ID: id })
          .post({
            body: {
              version: cartVersion,
              actions: [
                {
                  action: 'removeLineItem',
                  lineItemId,
                },
              ],
            },
          })
          .execute();
        setCartItems(updatedCart.body.lineItems);
        setTotalPrice(updatedCart.body.totalPrice);
        setCartVersion(updatedCart.body.version);
      } catch (error) {
        proceedExceptions(error, 'Could not delete item from cart');
      }
    }
  };

  const handleQuantityChange = async (lineItemId: string, newQuantity: number) => {
    if (id) {
      try {
        const updatedCart: ClientResponse<Cart> = await api
          .carts()
          .withId({ ID: id })
          .post({
            body: {
              version: cartVersion,
              actions: [
                {
                  action: 'changeLineItemQuantity',
                  lineItemId,
                  quantity: newQuantity,
                },
              ],
            },
          })
          .execute();
        setCartItems(updatedCart.body.lineItems);
        setTotalPrice(updatedCart.body.totalPrice);
        setCartVersion(updatedCart.body.version);
      } catch (error) {
        proceedExceptions(error, 'Could not update item quantity');
      }
    }
  };

  const handleClearCart = async () => {
    if (id) {
      try {
        const updatedCart: ClientResponse<Cart> = await api
          .carts()
          .withId({ ID: id })
          .post({
            body: {
              version: cartVersion,
              actions: cartItems.map((item) => ({
                action: 'removeLineItem',
                lineItemId: item.id,
              })),
            },
          })
          .execute();
        setCartItems([]);
        setTotalPrice(updatedCart.body.totalPrice);
        setCartVersion(updatedCart.body.version);
        setShowModal(false); // Hide the modal after clearing the cart
      } catch (error) {
        proceedExceptions(error, 'Could not clear the cart');
      }
    }
  };

  const getLocalizedName = (name: LocalizedString, locale: string) => {
    return name[locale] || name.en;
  };

  if (!localStorage.getItem('cartId')) {
    return <Message />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (cartItems.length === 0) {
    return <Message />;
  }

  return (
    <div className={style.cartContainer}>
      <h1>Shopping Cart</h1>
      <button
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
        className={style.clearCartButton}
      >
        Clear Shopping Cart
      </button>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onConfirm={() => {
          handleClearCart().catch((error: unknown) => {
            proceedExceptions(error, 'Modify item quantity failed');
          });
        }}
        title="Clear Shopping Cart"
        message="Are you sure you want to clear the shopping cart?"
      />

      <table className={style.cartTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{getLocalizedName(item.name, 'en-US')}</td>
              <td>
                {item.variant.images && item.variant.images.length > 0 ? (
                  <img
                    src={item.variant.images[0].url}
                    alt={getLocalizedName(item.name, 'en-US')}
                    className={style.productImage}
                  />
                ) : (
                  <span>No image available</span>
                )}
              </td>
              <td>
                {item.price.discounted
                  ? item.price.discounted.value.centAmount / 100
                  : item.price.value.centAmount / 100}
                {` ${item.price.value.currencyCode}`}
              </td>
              <td>
                <label htmlFor="countItem">
                  {' '}
                  <input
                    id="countItem"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      handleQuantityChange(item.id, parseInt(e.target.value, 10)).catch(
                        (error: unknown) => {
                          proceedExceptions(error, 'Modify item quantity failed');
                        },
                      );
                    }}
                    className={style.quantityInput}
                  />
                </label>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(item.id).catch((error: unknown) => {
                      proceedExceptions(error, 'Edit address failed');
                    });
                  }}
                  className={style.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.totalPrice}>
        <h3>
          Total:
          {totalPrice && totalPrice.centAmount / 100}
          {` ${totalPrice?.currencyCode ?? ''}`}
        </h3>
      </div>
    </div>
  );
};
