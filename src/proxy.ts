interface TargetObject {
  [key: string]: any;
}

const target: Record<string, unknown> = {};

/**
 * handler 객체는 해당 메서드들을 통해 proxy 객체의 모든 내부 메서드들을 오버라이드할 수 있다.
 */
const handler: ProxyHandler<TargetObject> = {
  // proxy의 set을 handler에서 overriding 하고 있는 것(객체 속성에 값을 할당하는 모든 시도를 가로채고 싶을 때)
  set: () => {
    throw new Error("please don't set properties on this object");
  },
};

/**
 * [proxy의 동작 방식]
 * 1. proxy 객체가 모든 내부 메서드 호출을 target 객체로 전달
 * 2. 누군가 proxy.[[Enumerate]]() 메서드 호출 시 target.[[Enumerate]]() 메서드가 그 결과를 반환
 */

const proxy: TargetObject = new Proxy(target, handler);

// example 1
proxy.color = 'pink';
