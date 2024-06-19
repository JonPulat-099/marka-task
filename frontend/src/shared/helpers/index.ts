export function formatPriceForClient(price: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(price)?.replace(/[,]/g, ' ')?.slice(1);
}

export function formatDateForClient(date: number) {
    const dateSrc = new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })

    return dateSrc.replace(/[,]/g, '')
}