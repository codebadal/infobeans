// export default function useRazorpay() {
//   const openCheckout = ({ orderId, amountPaise, name, email, contact, onSuccess, onFailure }) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: amountPaise,
//       currency: 'INR',
//       name: 'Exam Portal',
//       description: 'Registration Fee',
//       order_id: orderId,
//       prefill: { name, email, contact },
//       theme: { color: '#3399cc' },
//       handler: function (response) {
//         // response has: razorpay_payment_id, razorpay_order_id, razorpay_signature
//         onSuccess?.(response);
//       },
//       modal: {
//         ondismiss: function () {
//           onFailure?.(new Error('Payment cancelled'));
//         }
//       }
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
//   return { openCheckout };
// }






import { useEffect, useState } from "react";

export default function useRazorpay() {
  const [loaded, setLoaded] = useState(false);

  // Load script dynamically
  useEffect(() => {
    if (document.getElementById("razorpay-script")) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("Razorpay SDK failed to load");
    document.body.appendChild(script);
  }, []);

  const openCheckout = ({ orderId, amountPaise, name, email, contact, onSuccess, onFailure }) => {
    if (!loaded || !window.Razorpay) {
      alert("Razorpay SDK not loaded yet!");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountPaise,
      currency: 'INR',
      name: 'Exam Portal',
      description: 'Registration Fee',
      order_id: orderId,
      prefill: { name, email, contact },
      theme: { color: '#3399cc' },
      handler: function (response) {
        onSuccess?.(response);
      },
      modal: {
        ondismiss: function () {
          onFailure?.(new Error('Payment cancelled'));
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return { openCheckout };
}
