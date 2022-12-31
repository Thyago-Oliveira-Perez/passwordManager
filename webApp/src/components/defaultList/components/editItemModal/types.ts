export interface EditItemModalProps {
  open: boolean;
  onClose: () => void;
  passwordToEdit: string;
  setPasswordToEdit: React.Dispatch<React.SetStateAction<string>>
}
