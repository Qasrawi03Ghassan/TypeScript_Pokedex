export function cleanInput(str:string):string[]{
    let trimmed = str.trim();
    let lowered = trimmed.toLowerCase();
    let resultList = lowered.split(/\s+/);

    return resultList;
}