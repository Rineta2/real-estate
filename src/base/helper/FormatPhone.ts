export const formatPhoneForWhatsApp = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // If the number starts with '0', assume it's an Indonesian number and replace with '62'
  if (digits.startsWith("0")) {
    return "62" + digits.substring(1);
  }

  // If it already has a country code (assumed if it doesn't start with 0)
  return digits;
};
