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
  showFields?: {
    email: boolean;
    password: boolean;
    firstName: boolean;
    lastName: boolean;
    dateOfBirth: boolean;
  };
  disabledMode?: boolean;
}

export const RegistrationMainFields: React.FC<RegistrationMainFieldsProps> = ({
  formData,
  handleChange,
  errors,
  showFields = { email: true, password: true, firstName: true, lastName: true, dateOfBirth: true },
  disabledMode = false,
}) => {
  return (
    <div className={styleAddr.formbody}>
      {showFields.email && (
        <InputWithLabel
          id="email"
          type="text"
          name="email"
          label="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
          disabledMode={disabledMode}
        />
      )}
      {showFields.password && (
        <InputWithLabel
          id="password"
          type="password"
          name="password"
          label="password"
          value={formData.password}
          onChange={handleChange}
          required
          error={errors.password}
          disabledMode={disabledMode}
        />
      )}

      {showFields.firstName && (
        <InputWithLabel
          id="firstName"
          type="text"
          name="firstName"
          label="first Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          error={errors.firstName}
          disabledMode={disabledMode}
        />
      )}
      {showFields.lastName && (
        <InputWithLabel
          id="lastName"
          type="text"
          name="lastName"
          label="last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          error={errors.lastName}
          disabledMode={disabledMode}
        />
      )}
      {showFields.dateOfBirth && (
        <InputWithLabel
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          label="date Of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          error={errors.dateOfBirth}
          disabledMode={disabledMode}
        />
      )}
    </div>
  );
};
