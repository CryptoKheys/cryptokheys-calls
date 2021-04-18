export class CallUtils {
    public static calculatePnl(
        currentPrice: number,
        callPrice: number
    ): number {
        return (100 * (currentPrice - callPrice)) / callPrice;
    }
}
