import React from 'react';
import style from 'src/components/address/Address.module.scss';
import Selector from 'src/components/selector/Selector.tsx';
import { InputWithLabel } from 'src/components/input/InputWithLabel.tsx';
import { Checkbox } from 'src/components/checkbox/Checkbox.tsx';

interface BillingAddressProps {
  formData: {
    isBillingDefaultAddress: boolean;
    billingStreet: string | undefined;
    billingCity: string | undefined;
    billingCountry: string | undefined;
    billingPostalCode: string | undefined;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBoolean: (field: string, value: boolean) => void;
  errors: {
    billingStreet: string | undefined;
    billingCity: string | undefined;
    billingCountry: string | undefined;
    billingPostalCode: string | undefined;
  };
  title: string;
  disabledMode?: boolean;
}

export const BillingAddressForm: React.FC<BillingAddressProps> = ({
  formData,
  handleChange,
  handleBoolean,
  errors,
  title,
  disabledMode = false,
}) => {
  return (
    <div>
      <h2 className={style.left_aligned}>{title}</h2>
      <div className={style.checkbox_billing}>
        <Checkbox
          id="billingCheckbox"
          label="Set as default address"
          checked={formData.isBillingDefaultAddress}
          onChange={() => {
            handleBoolean('isBillingDefaultAddress', !formData.isBillingDefaultAddress);
          }}
          disabledMode={disabledMode}
        />
      </div>
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
          disabledMode={disabledMode}
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
          disabledMode={disabledMode}
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
            disabledMode,
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
          disabledMode={disabledMode}
        />
      </div>
    </div>
  );
};
