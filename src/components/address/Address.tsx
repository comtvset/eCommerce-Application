import React from 'react';
import style from 'src/components/address/Address.module.scss';
import Selector from 'src/components/selector/Selector.tsx';
import { InputWithLabel } from 'src/components/input/InputWithLabel.tsx';
import { Checkbox } from 'src/components/checkbox/Checkbox.tsx';

interface AddressProps {
  formData: {
    isShippingDefaultAddress: boolean;
    isEqualAddress: boolean;
    street: string | undefined;
    city: string | undefined;
    country: string | undefined;
    postalCode: string | undefined;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBoolean: (value: boolean) => void;
  handleSameAddress: (value: boolean) => void;
  errors: {
    street: string | undefined;
    city: string | undefined;
    country: string | undefined;
    postalCode: string | undefined;
  };
  title: string;
  showIsTheSameAddress?: boolean;
  disabledMode: boolean;
}

export const AddressForm: React.FC<AddressProps> = ({
  formData,
  handleChange,
  handleBoolean,
  handleSameAddress,
  errors,
  title,
  showIsTheSameAddress = true,
  disabledMode = false,
}) => {
  return (
    <div>
      <h2 className={style.left_aligned}>{title}</h2>
      <div className={style.checkboxes}>
        <Checkbox
          id="shippingCheckbox"
          label="Set as default address"
          checked={formData.isShippingDefaultAddress}
          onChange={handleBoolean}
          disabledMode={disabledMode}
        />
        {showIsTheSameAddress && (
          <Checkbox
            id="isEqualAddress"
            label="Shipping and Billing address are the same"
            checked={formData.isEqualAddress}
            onChange={handleSameAddress}
            disabledMode={disabledMode}
          />
        )}
      </div>
      <div className={style.formbody}>
        <InputWithLabel
          id="street"
          type="text"
          name="street"
          label="Street"
          value={formData.street}
          onChange={handleChange}
          required
          error={errors.street}
          disabledMode={disabledMode}
        />
        <InputWithLabel
          id="city"
          type="text"
          name="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
          required
          error={errors.city}
          disabledMode={disabledMode}
        />
        <Selector
          selectorProps={{
            id: 'country',
            name: 'country',
            value: formData.country,
            label: 'Country',
            options: [
              { value: '', label: '...' },
              { value: 'France', label: 'France' },
              { value: 'Germany', label: 'Germany' },
              { value: 'Italy', label: 'Italy' },
              { value: 'Netherlands', label: 'Netherlands' },
            ],
            onChange: handleChange,
            onBlur: handleChange,
            error: errors.country,
            disabledMode,
          }}
        />
        <InputWithLabel
          id="postalCode"
          type="text"
          name="postalCode"
          label="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          required
          error={errors.postalCode}
          disabledMode={disabledMode}
        />
      </div>
    </div>
  );
};
