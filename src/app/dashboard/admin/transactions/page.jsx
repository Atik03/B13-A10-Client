export default function TransactionsPage() {
  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      <table className="table bg-base-100 rounded-xl">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>User Email</th>
            <th>Librarian Email</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#TX2456</td>
            <td>atik@gmail.com</td>
            <td>library@gmail.com</td>
            <td>$5</td>
            <td>20 Aug 2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
