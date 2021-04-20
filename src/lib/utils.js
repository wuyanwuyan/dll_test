export const resReturn = (data = null, code = 0, message = 'success') => {
    return {
        code,
        message,
        data
    }
}