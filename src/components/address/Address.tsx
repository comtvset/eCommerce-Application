import React from 'react';
import style from 'src/components/address/Address.module.scss';
import Selector from 'src/components/selector/Selector.tsx';
import { InputWithLabel } from 'src/components/input/InputWithLabel.tsx';
import { Checkbox } from 'src/components/checkbox/Checkbox.tsx';

interface AddressProps {
  formData: {
    isShippingDefaultAddress: boolean;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBoolean: (value: boolean) => void;
  errors: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  title: string;
}

export const AddressForm: React.FC<AddressProps> = ({
  formData,
  handleChange,
  handleBoolean,
  errors,
  title,
}) => {
  return (
    <>
      <h2 className={style.left_aligned}>{title}</h2>
      <Checkbox
        label="Set as default address"
        checked={formData.isShippingDefaultAddress}
        onChange={handleBoolean}
      />
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
        />
      </div>
    </>
  );
};