import { LocationResponse } from '../../common/types';

async function getPublicIp(): Promise<string> {
  try {
    const res = await fetch('http://checkip.amazonaws.com');
    return (await res.text()).trim();
  } catch {
    return '0.0.0.0';
  }
}

async function getLocation(publicIp: string): Promise<LocationResponse> {
  const ipApiUrl =
    `http://ip-api.com/json/${publicIp}` +
    `?fields=status,country,countryCode,regionName,city,lat,lon`;

  const res = await fetch(ipApiUrl);
  const locationByIpResponse = (await res.json()) as LocationResponse;
  return locationByIpResponse;
}

export default async function getCurrentLocation(): Promise<LocationResponse> {
  const publicIp = await getPublicIp();
  const locationByIpResponse: LocationResponse = await getLocation(publicIp);
  return locationByIpResponse;
}
