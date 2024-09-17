interface TargetObject {
  [key: string]: any;
}

const target: Record<string, unknown> = {};
const handler: ProxyHandler<TargetObject> = {};

/**
 * [proxy의 동작 방식]
 * 1. proxy 객체가 모든 내부 메서드 호출을 target 객체로 전달
 * 2. 누군가 proxy.[[Enumerate]]() 메서드 호출 시 target.[[Enumerate]]() 메서드가 그 결과를 반환
 */

const proxy: TargetObject = new Proxy(target, handler);

// example 1
proxy.color = 'pink';

// proxy에 특정 필드에 값을 추가하면, target에도 그대로 전달된다.
console.log(target.color);
