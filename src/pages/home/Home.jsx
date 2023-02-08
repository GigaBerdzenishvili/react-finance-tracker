// custom hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
// componetns
import TransactionForm from "./TransactionForm";
import TransactionsList from "./TransactionsList";
// styles
import classes from "./Home.module.css";

function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionsList transactions={documents} />}
      </div>
      <div className={classes.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

export default Home;
