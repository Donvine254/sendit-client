
import Map from "../Map";


export default function PickupDetails({valid, setValid}) {
  return (
    <div className="mx-5">
        <Map mapToRender="pickup" valid={valid} setValid={setValid} />
    </div>
  );
}
