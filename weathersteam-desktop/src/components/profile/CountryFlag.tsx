import { hasFlag } from 'country-flag-icons';
import * as Flags from 'country-flag-icons/react/3x2';

interface CountryFlagProps {
  countryCode: string;
}

export default function CountryFlag(props: CountryFlagProps) {
  if (!hasFlag(props.countryCode)) return null;
  const Flag = Flags[props.countryCode as keyof typeof Flags];
  return <Flag style={{ width: 20, verticalAlign: 'middle' }} />;
}
