export default function capitalizeWords(inputString: string) {
    return inputString.replace(/\b\w/g, (match) => match.toUpperCase());
}