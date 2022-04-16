
export const walletAddressSlicer = (wallet) => {
  if (typeof wallet === "string") {
    return (
      wallet.substring(0, 7) +
      "..." +
      wallet.substring(wallet.length - 7, wallet.length)
    );
  }
};

export const numberWithCommas = (number, tofixed) => {
    if (tofixed)
        number = Number(number).toFixed(tofixed);

    const str = number.toString().split('.');
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');

    return str.join('.');
}