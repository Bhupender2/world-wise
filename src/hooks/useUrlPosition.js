import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams, SetSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
// whenever we need the position from the URL we need to call this costum HOOK
