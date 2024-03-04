import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export default function PayPalBtns() {
  return (
    <PayPalScriptProvider
    options={{ clientId: "test" }}
    >
            <PayPalButtons
            style={{
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                height: 54
            }}
            
            />
    </PayPalScriptProvider>
  )
}
