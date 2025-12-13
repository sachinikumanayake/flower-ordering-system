import React, { useContext } from 'react';
import { StoreContext } from 'shared-context';

const Placeorder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="flex flex-col md:flex-row items-start justify-center gap-10 p-4 md:p-10">
      {/* Delivery Form */}
      <div className="w-full md:w-1/2">
        <p className="text-xl font-semibold mb-8">Delivery Information</p>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="border w-full p-3 rounded outline-[tomato]"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border w-full p-3 rounded outline-[tomato]"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            className="border w-full p-3 rounded outline-[tomato] mb-4"
          />
          <input
            type="text"
            placeholder="Street"
            className="border w-full p-3 rounded outline-[tomato]"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Zip Code"
            className="border w-full p-3 rounded outline-[tomato]"
          />
          <input
            type="text"
            placeholder="Country"
            className="border w-full p-3 rounded outline-black"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone"
            className="border w-full p-3 rounded outline-orange-600"
          />
        </div>
      </div>

      {/* Cart Summary */}
      <div className="w-full md:w-1/2 max-w-lg">
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-lg">Cart Totals</h2>

          <div className="flex justify-between text-slate-500 border-b pb-2">
            <p>Subtotal</p>
            <p>R{getTotalCartAmount()}</p>
          </div>

          <div className="flex justify-between text-slate-500 border-b pb-2">
            <p>Delivery Fee</p>
            <p>R450</p>
          </div>

          <div className="flex justify-between text-slate-700 font-semibold border-b pb-2">
            <p>Total</p>
            <p>R{getTotalCartAmount() + 450}</p>
          </div>

          <button className="mt-6 border border-gray-300 px-4 py-3 rounded bg-green-500 hover:bg-green-600 text-white font-semibold w-full sm:w-[200px]">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
