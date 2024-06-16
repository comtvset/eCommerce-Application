import React, { useEffect, useState } from 'react';
import style from 'src/components/form/cart/CartCustomer.module.scss';
import { ServerError } from 'src/utils/error/RequestErrors.ts';
import { createApiRoot, createLoginApiRoot } from 'src/services/api/BuildClient.ts';
import { Paragraph } from 'src/components/text/Text.tsx';
import { Cart, ClientResponse, LineItem, LocalizedString } from '@commercetools/platform-sdk';
import useModalEffect from 'src/components/form/profile/UseModalEffect.ts';
import Modal from 'src/components/modalWindow/confirmationModal.tsx';

export const CartCustomer: React.FC = () => {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [originalTotalPrice, setOriginalTotalPrice] = useState<number>(0);
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState<number>(0);
  const [cartVersion, setCartVersion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');

  const [api] = useState(localStorage.getItem('fullID') ? createLoginApiRoot() : createApiRoot());
  const [id] = useState(localStorage.getItem('cartId') ?? '');
  const [showModal, setShowModal] = useState(false);

  const popupMessage = { status: '', message: '' };
  const [modalData, setModalData] = useState(popupMessage);
  useModalEffect(modalData, setModalData);

  const emptyPageMessage =
    "Your cart is currently empty, but that's an easy fix! Head over to our store and fill it up with the items you'd like. We're waiting for you!";

  const proceedExceptions = (error: unknown, message: string) => {
    if (error instanceof ServerError) {
      setModalData({ status: 'Error', message: error.message });
    } else if (error instanceof Error) {
      setModalData({ status: 'Error', message: error.message });
    } else {
      setModalData({ status: 'Error', message });
    }
  };

  const calculateTotalDiscountedAmount = (lineItems: LineItem[], discountedTotal: number) => {
    let totalDiscountedAmount = 0;

    lineItems.forEach((item) => {
      item.discountedPricePerQuantity.forEach((quantityDiscount) => {
        quantityDiscount.discountedPrice.includedDiscounts.forEach((discount) => {
          totalDiscountedAmount += discount.discountedAmount.centAmount * quantityDiscount.quantity;
        });
      });
    });

    return (totalDiscountedAmount + discountedTotal) / 100;
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
          const cart = cartCustomer.body;

          const originalPrice = calculateTotalDiscountedAmount(
            cart.lineItems,
            cart.totalPrice.centAmount,
          );
          setCartItems(cart.lineItems);
          setOriginalTotalPrice(originalPrice);
          setDiscountedTotalPrice(cart.totalPrice.centAmount / 100);
          setCartVersion(cart.version);
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
        const cart = updatedCart.body;
        const originalPrice = calculateTotalDiscountedAmount(
          cart.lineItems,
          cart.totalPrice.centAmount,
        );
        setCartItems(cart.lineItems);
        setOriginalTotalPrice(originalPrice);
        setDiscountedTotalPrice(cart.totalPrice.centAmount / 100);
        setCartVersion(cart.version);
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
        const cart = updatedCart.body;
        const originalPrice = calculateTotalDiscountedAmount(
          cart.lineItems,
          cart.totalPrice.centAmount,
        );
        setCartItems(cart.lineItems);
        setOriginalTotalPrice(originalPrice);
        setDiscountedTotalPrice(cart.totalPrice.centAmount / 100);
        setCartVersion(cart.version);
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
        const cart = updatedCart.body;
        const originalPrice = calculateTotalDiscountedAmount(
          cart.lineItems,
          cart.totalPrice.centAmount,
        );
        setCartItems([]);
        setOriginalTotalPrice(originalPrice);
        setDiscountedTotalPrice(cart.totalPrice.centAmount / 100);
        setCartVersion(cart.version);
        setShowModal(false); // Hide the modal after clearing the cart
      } catch (error) {
        proceedExceptions(error, 'Could not clear the cart');
      }
    }
  };

  const handleApplyPromoCode = async () => {
    if (id && promoCode) {
      try {
        const updatedCart: ClientResponse<Cart> = await api
          .carts()
          .withId({ ID: id })
          .post({
            body: {
              version: cartVersion,
              actions: [
                {
                  action: 'addDiscountCode',
                  code: promoCode,
                },
              ],
            },
          })
          .execute();
        const cart = updatedCart.body;
        const originalPrice = calculateTotalDiscountedAmount(
          cart.lineItems,
          cart.totalPrice.centAmount,
        );
        setCartItems(cart.lineItems);
        setOriginalTotalPrice(originalPrice);
        setDiscountedTotalPrice(cart.totalPrice.centAmount / 100);
        setCartVersion(cart.version);
        setPromoCode('');
      } catch (error) {
        proceedExceptions(error, 'Could not apply promo code');
      }
    }
  };

  const getLocalizedName = (name: LocalizedString, locale: string) => {
    return name[locale] || name.en;
  };

  if (!localStorage.getItem('cartId')) {
    return <Paragraph tag="p" className={style.cart__empty} title={emptyPageMessage} />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!cartItems.length) {
    return <Paragraph tag="p" className={style.cart__empty} title={emptyPageMessage} />;
  }

  return (
    <div className={style.cartContainer}>
      <h1>Shopping Cart</h1>

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
      <div className={style.wrapper}>
        <table className={style.cartTable}>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
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
                  <div className={style.productDescription}>
                    {getLocalizedName(item.name, 'en-US')}
                  </div>
                  <div>
                    <div>
                      {item.discountedPricePerQuantity.length > 0 ? (
                        <div className={style.tablePriceContainer}>
                          <span className={style.crossedOutPrice}>
                            {item.price.discounted
                              ? item.price.discounted.value.centAmount / 100
                              : item.price.value.centAmount / 100}
                          </span>
                          <span className={style.discountedPrice}>
                            {item.discountedPricePerQuantity[0].discountedPrice.value.centAmount /
                              100}
                            {` ${item.price.value.currencyCode}`}
                          </span>
                        </div>
                      ) : (
                        <div>
                          {item.price.discounted
                            ? item.price.discounted.value.centAmount / 100
                            : item.price.value.centAmount / 100}
                          {` ${item.price.value.currencyCode}`}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <label htmlFor="countItem">
                    <div className={style.quantityControl}>
                      <button
                        type="button"
                        className={style.quantityButton}
                        onClick={() => {
                          handleQuantityChange(item.id, item.quantity - 1).catch(
                            (error: unknown) => {
                              proceedExceptions(error, 'Could not apply promo code');
                            },
                          );
                        }}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={style.quantityValue}>{item.quantity}</span>
                      <button
                        type="button"
                        className={style.quantityButton}
                        onClick={() => {
                          handleQuantityChange(item.id, item.quantity + 1).catch(
                            (error: unknown) => {
                              proceedExceptions(error, 'Could not apply promo code');
                            },
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
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
                    <span className={style.deleteButtonLarge}>Delete</span>
                    <span className={style.deleteButtonSmall}>X</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={style.right_column}>
          <button
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
            className={style.clearCartButton}
          >
            Clear Shopping Cart
          </button>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
            }}
            placeholder="Enter promo code"
            className={style.promoCodeInput}
          />
          <button
            type="button"
            onClick={() => {
              handleApplyPromoCode().catch((error: unknown) => {
                proceedExceptions(error, 'Could not apply promo code');
              });
            }}
            className={style.applyPromoButton}
          >
            Apply
          </button>
          <div className={style.totalPriceContainer}>
            {originalTotalPrice - discountedTotalPrice !== 0 && (
              <div className={style.originalPrice}>
                <h3>
                  Original Total:
                  <span className={style.crossedOutPrice}>
                    {originalTotalPrice}
                    {` ${cartItems[0]?.price.value.currencyCode}`}
                  </span>
                </h3>
              </div>
            )}
            <div className={style.discountedPrice}>
              <h3>
                Total:
                {discountedTotalPrice}
                {` ${cartItems[0]?.price.value.currencyCode ?? ''}`}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
