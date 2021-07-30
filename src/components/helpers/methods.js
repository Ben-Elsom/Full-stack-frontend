export function expand_errors(response) {
    const errors = []
    Object.keys(response.error).forEach(key => {
        response.error[key].forEach(value => {
            errors.push(`${key.replace("_", " ")} ${value}`)
        })
    });
    return errors
}

export default {}
