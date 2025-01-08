export const ReplaceDomain = (item, t = null) => {
    let temp = item
    if (t === "isss") {
    }    
    if (temp) {
        temp = temp.replace('https://wordpress-1074629-4621962.cloudwaysapps.com','')
    }
    return temp
}
