export const takeProfit = [
  {
    id: '1',
    title: 'What is a Take-Profit Order (T/P)',
    description: `<p>A take-profit order (T/P) is a type of limit order that specifies the exact price at which to close out an open position for a profit. If the price of the security does not reach the limit price, the take-profit order does not get filled.</p>
      `
  },
  {
    id: '2',
    title: 'Basics of a Take-Profit Order',
    description: `<p>Most traders use take-profit orders in conjunction with stop-loss orders (S/L) to manage their open positions. If the security rises to the take-profit point, the T/P order is executed and the position is closed for a gain. If the security falls to the stop-loss point, the S/L order is executed and the position is closed for a loss. The difference between the market price and these two points helps define the trade's risk-to-reward ratio.</p>
    <p>The benefit of using a take-profit order is that the trader doesn't have to worry about manually executing a trade or second-guessing themselves. On the other hand, take-profit orders are executed at the best possible price regardless of the underlying security's behavior. The stock could start to breakout higher, but the T/P order might execute at the very beginning of the breakout, resulting in high opportunity costs.</p>
    <p>Take-profit orders are best used by short-term traders interested in managing their risk. This is because they can get out of a trade as soon as their planned profit target is reached and not risk a possible future downturn in the market. Traders with a long-term strategy do not favor such orders because it cuts into their profits.</p>
    <p>Take-profit orders are often placed at levels that are defined by other forms of technical analysis, including chart pattern analysis and support and resistance levels, or using money management techniques, such as the Kelly Criterion. Many trading system developers also use take-profit orders when placing automated trades since they can be well-defined and serve as a great risk management technique.</p>
    `
  },
  {
    id: '3',
    title: 'Take-Profit Order Example',
    description: `<p>Suppose that a trader spots an ascending triangle chart pattern and opens a new long position. If the stock has a breakout, the trader expects that it will rise to 15 percent from its current levels. If the stock doesn't breakout, the trader wants to quickly exit the position and move on to the next opportunity. The trader might create a take-profit order that is 15 percent higher than the market price in order to automatically sell when the stock reaches that level. At the same time, they may place a stop-loss order that's five percent below the current market price</p>
    <p>The combination of the take-profit and stop-loss order creates a 5:15 risk-to-reward ratio, which is favorable assuming that the odds of reaching each outcome are equal, or if the odds are skewed toward the breakout scenario. </p>
    <p>By placing the take-profit order, the trader doesn't have to worry about diligently tracking the stock throughout the day or second-guessing themselves with regards to how high the stock may go after the breakout. There is a well-defined risk-to-reward ratio and the trader knows what to expect before the trade even occurs.</p>

    `
  }
];
