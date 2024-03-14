export interface TextField {
  emailIcon?: boolean;
  keyIcon?: boolean;
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  errorEmail?: string;
  errorPassword?: string;
  // secureTextEntry?: boolean;
  // onChange?: any;
  // autoCapitalize?: string;
}
