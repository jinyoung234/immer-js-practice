type Primitive = string | number | boolean | null | undefined;

function set<T extends Record<string, unknown>, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

export function setIn<T extends Record<string, any>>(
  obj: T,
  path: (string | number)[],
  value: any
): T {
  if (path.length === 0) {
    return value;
  }

  const [key, ...restOfPath] = path;
  let modifiedNode: any = value;

  if (restOfPath.length > 0) {
    modifiedNode = setIn((obj[key as keyof T] as Record<string, any>) || {}, restOfPath, value);
  }

  return set(obj, key as keyof T, modifiedNode);
}
