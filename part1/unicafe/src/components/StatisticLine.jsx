export const StatisticLine = ({ text, value, suffix }) => (
    <tr>
        <td>{text}</td><td>{value} {suffix}</td>
    </tr>
);
