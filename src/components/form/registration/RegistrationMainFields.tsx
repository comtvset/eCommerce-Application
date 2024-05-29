import React from 'react';
import styleAddr from 'src/components/address/Address.module.scss';

import { InputWithLabel } from 'src/components/input/InputWithLabel.tsx';

export interface RegistrationMainFieldsProps {
  formData: {
    email: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    dateOfBirth: string | undefined;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: {
    email: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    dateOfBirth: string | undefined;
  };
  showEmailAndPassword?: boolean;
}

export const RegistrationMainFields: React.FC<RegistrationMainFieldsProps> = ({
  formData,
  handleChange,
  errors,
  showEmailAndPassword = true,
}) => {
  return (
    <div className={styleAddr.formbody}>
      {showEmailAndPassword && (
        <>
          <InputWithLabel
            id="email"
            type="text"
            name="email"
            label="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
          <InputWithLabel
            id="password"
            type="password"
            name="password"
            label="password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />
        </>
      )}

      <InputWithLabel
        id="firstName"
        type="text"
        name="firstName"
        label="first Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        error={errors.firstName}
      />
      <InputWithLabel
        id="lastName"
        type="text"
        name="lastName"
        label="last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        error={errors.lastName}
      />
      <InputWithLabel
        id="dateOfBirth"
        type="date"
        name="dateOfBirth"
        label="date Of Birth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
        error={errors.dateOfBirth}
      />
    </div>
  );
};
