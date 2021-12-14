# Deep Dive 6. 11장 원시값과 객체의 비교

### _원시값과 객체의 비교_

- JS는 동적 타이핑 언어
  - 값 할당할 때 타입 정해져서 메모리 확보
  - 만약 원시타입이 mutable이면 메모리 단편화 생겨서 많이 느려짐
    - 값이 또 가변적이면 얼마나 가져와야할지 가늠하기 힘듦
  - write 빠름
- 일급 함수 쓰는 함수형 언어들은 모두 다 원시값이 immutable
- string은 원시값이지만 인덱싱 가능 (쪼갤 수 있음)
  - string은 null pointer 나올때까지 1바이트씩 잡힘
  - 한글 2바이트/3바이트, 이모티콘 4바이트
  - 바이트 단위로 얼만큼인지 정해져 있어서 쪼갤 수 있음
  - length 프로퍼티는 바이트 수가 아님
    - 실제로 한글자 한글자 쪼갰을 때의 개수임
  - 사실 string을 인덱싱하거나 length 로 부르는 것은 별로 안좋음
    - 속에서 다 잘라서 가져와야 함 (시간 소요)
  - toUpperCase( )는 순간 객체 타입이 되는 것임 (Wrapper 클래스)
    - 순간 object 됨
- Call by value vs. Call by reference
- 원시타입은 value로 값 비교
- 객체타입은 참조하는 메모리 주소로 비교
- 객체
  - 힙에 넓은 공간에 자리 잡아서 메모리 주소 참조
- 얕은 복사 vs. 깊은 복사

  - 스프레드 문법 매우 중요
  - lodash 라이브러리 많이 사용함 (\_ 로 표현)
    - 대신 조금 무거움

  ```js
  const u = { id: 1, addr: { city: 'Seoul' } };

  // 얕은 복사 - 참조 복사, 객체 복사
  // 참조 복사; 주소 값 복사 (rc와 u가 참조하는 주소 동일)
  const rc = u;
  // object는 자기만의 인스턴스(세계) 생김
  // 객체 복사; (u와 oc의 참조 주소는 다름, 대신 속의 object 까지는 복사 안됨)
  const oc = { ...u };

  // u.id === rc.id (true)

  // oc.id = 7
  // u.id === oc.id (false)

  // rc.addr.city = 'Busan' [링크드 리스트]
  // rc.addr.city === u.addr.city (true)
  // rc.addr.city === oc.addr.city (true)
  // 속 object 까지는 복사 못함

  // 깊은 복사
  // 속 object 참조 주소까지도 같이 복제함 (별도로 힙에 생김)
  // lodash 라이브러리의 _.cloneDeep( ) 이용 가능
  const dc = {};
  dc.id = u.id;
  dc.addr = { ...u.addr };
  // 트리처럼 타고 가면서 속까지 다 복사해줘야 함
  // lodash 라이브러리 무거워서 안쓰면
  // Object.keys() 이용해서 key 값 가져오고
  // typeof key === 'object' 이면 쭉 다 복사시키기 (재귀)
  ```

#

### [Note]

- 원시값 변경 가능한 언어도 있음 (컴파일 방식에 따라 다름)
- 정적 타이핑; 컴파일 때 타입 정함
  - 확장되면 write 느림
- 리액트 모두 순수함수로 개발
