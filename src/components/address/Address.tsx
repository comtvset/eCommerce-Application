import React from 'react';
import style from 'src/components/address/Address.module.scss';

interface AddressProps {
  formData: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  title: string;
}

export const AddressForm: React.FC<AddressProps> = ({ formData, handleChange, errors, title }) => {
  return (
    <>
      <h2 className={style.left_aligned}>{title}</h2>
      <div className={style.formbody}>
        <div className={style.label_block}>
          <label htmlFor="street">Street</label>
          <label htmlFor="city">City</label>
          <label htmlFor="country">Country</label>
          <label htmlFor="postalCode">Postal code</label>
        </div>
        <div className={style.input_block}>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleChange}
            autoComplete="off"
            required
          >
            <option value="">...</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="Netherlands">Netherlands</option>
          </select>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.error_block}>
          <div className={style.errorText}>{errors.street}</div>
          <div className={style.errorText}>{errors.city}</div>
          <div className={style.errorText}>{errors.country}</div>
          <div className={style.errorText}>{errors.postalCode}</div>
        </div>
      </div>
    </>
  );
};
