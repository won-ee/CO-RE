import { StylesConfig } from 'react-select';

// 1. OptionType 인터페이스 정의
export interface OptionType {
  value: string;
  label: string;
}

// 2. StylesConfig 정의 (단일 선택용)
export type SingleSelectStyles = StylesConfig<OptionType, false>;

// 3. 다중 선택을 위한 StylesConfig 타입 (필요할 경우)
export type MultiSelectStyles = StylesConfig<OptionType, true>;