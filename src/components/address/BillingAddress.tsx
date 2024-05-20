import React from 'react';
import style from 'src/components/address/Address.module.scss';
import Selector from 'src/components/selector/Selector.tsx';
import { InputWithLabel } from 'src/components/input/InputWithLabel.tsx';
import { Checkbox } from 'src/components/checkbox/Checkbox.tsx';

interface BillingAddressProps {
  formData: {
    isBillingDefaultAddress: boolean;
    billingStreet: string;
    billingCity: string;
    billingCountry: string;
    billingPostalCode: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBoolean: (value: boolean) => void;
  errors: {
    billingStreet: string;
    billingCity: string;
    billingCountry: string;
    billingPostalCode: string;
  };
  title: string;
}

export const BillingAddressForm: React.FC<BillingAddressProps> = ({
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
        id="billingCheckbox"
        label="Set as default address"
        checked={formData.isBillingDefaultAddress}
        onChange={handleBoolean}
      />
      <div className={style.formbody}>
        <InputWithLabel
          id="billingStreet"
          type="text"
          name="billingStreet"
          label="Street"
          value={formData.billingStreet}
          onChange={handleChange}
          required
          error={errors.billingStreet}
        />
        <InputWithLabel
          id="billingCity"
          type="text"
          name="billingCity"
          label="City"
          value={formData.billingCity}
          onChange={handleChange}
          required
          error={errors.billingCity}
        />
        <Selector
          selectorProps={{
            id: 'billingCountry',
            name: 'billingCountry',
            value: formData.billingCountry,
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
            error: errors.billingCountry,
          }}
        />
        <InputWithLabel
          id="billingPostalCode"
          type="text"
          name="billingPostalCode"
          label="Postal Code"
          value={formData.billingPostalCode}
          onChange={handleChange}
          required
          error={errors.billingPostalCode}
        />
      </div>
    </>
  );
};
