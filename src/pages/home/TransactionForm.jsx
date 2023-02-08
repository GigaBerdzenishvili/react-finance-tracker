// react hooks
import { useEffect, useState } from "react";

// custom hook
import useFirestore from "../../hooks/useFirestore";

function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (event) => {
    event.preventDefault();
    addDocument({
      uid,
      name,
      amount,
    });
  };

  useEffect(() => {
    if (response.success) {
      setAmount("");
      setName("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Expense</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Expense name:</span>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            type="text"
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
            type="number"
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}

export default TransactionForm;
