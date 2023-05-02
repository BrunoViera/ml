export default function FreeShippingIcon() {
  return (
    <picture className="free-shipping__icon">
      <source srcSet="/assets/ic_shipping@2x.png 2x" />
      <source srcSet="/assets/ic_shipping.png" />
      <img src="/assets/ic_shipping.png" alt="Shipping logo" />
    </picture>
  );
}
