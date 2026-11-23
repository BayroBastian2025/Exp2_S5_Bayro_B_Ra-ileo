import{z as O,_ as V,g as D,o as q,l as c,q as S,B as W,D as A,E as M,F as R,G as _}from"./index-DfI2cSJa.js";var v=new Map,E=new Map,I=!0,h=!1;function x(e){return e.replace(/[\s,]+/g," ").trim()}function G(e){return x(e.source.body.substring(e.start,e.end))}function N(e){var a=new Set,n=[];return e.definitions.forEach(function(r){if(r.kind==="FragmentDefinition"){var t=r.name.value,s=G(r.loc),i=E.get(t);i&&!i.has(s)?I&&console.warn("Warning: fragment with name "+t+` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`):i||E.set(t,i=new Set),i.add(s),a.has(s)||(a.add(s),n.push(r))}else n.push(r)}),V(V({},e),{definitions:n})}function Q(e){var a=new Set(e.definitions);a.forEach(function(r){r.loc&&delete r.loc,Object.keys(r).forEach(function(t){var s=r[t];s&&typeof s=="object"&&a.add(s)})});var n=e.loc;return n&&(delete n.startToken,delete n.endToken),e}function z(e){var a=x(e);if(!v.has(a)){var n=O(e,{experimentalFragmentVariables:h,allowLegacyFragmentVariables:h,experimentalFragmentArguments:h});if(!n||n.kind!=="Document")throw new Error("Not a valid GraphQL document.");v.set(a,Q(N(n)))}return v.get(a)}function p(e){for(var a=[],n=1;n<arguments.length;n++)a[n-1]=arguments[n];typeof e=="string"&&(e=[e]);var r=e[0];return a.forEach(function(t,s){t&&t.kind==="Document"?r+=t.loc.source.body:r+=t,r+=e[s+1]}),z(r)}function T(){v.clear(),E.clear()}function L(){I=!1}function $(){h=!0}function j(){h=!1}var g={gql:p,resetCaches:T,disableFragmentWarnings:L,enableExperimentalFragmentVariables:$,disableExperimentalFragmentVariables:j};(function(e){e.gql=g.gql,e.resetCaches=g.resetCaches,e.disableFragmentWarnings=g.disableFragmentWarnings,e.enableExperimentalFragmentVariables=g.enableExperimentalFragmentVariables,e.disableExperimentalFragmentVariables=g.disableExperimentalFragmentVariables})(p||(p={}));p.default=p;function B(e){var a=D.useContext(q()),n=e||a.client;return c(!!n,78),n}var o;(function(e){e[e.Query=0]="Query",e[e.Mutation=1]="Mutation",e[e.Subscription=2]="Subscription"})(o||(o={}));var f;function y(e){var a;switch(e){case o.Query:a="Query";break;case o.Mutation:a="Mutation";break;case o.Subscription:a="Subscription";break}return a}function C(e){W("parser",function(){globalThis.__DEV__!==!1&&c.warn(93)}),f||(f=new A(M.parser||1e3));var a=f.get(e);if(a)return a;var n,r,t;c(!!e&&!!e.kind,94,e);for(var s=[],i=[],l=[],d=[],m=0,k=e.definitions;m<k.length;m++){var u=k[m];if(u.kind==="FragmentDefinition"){s.push(u);continue}if(u.kind==="OperationDefinition")switch(u.operation){case"query":i.push(u);break;case"mutation":l.push(u);break;case"subscription":d.push(u);break}}c(!s.length||i.length||l.length||d.length,95),c(i.length+l.length+d.length<=1,96,e,i.length,d.length,l.length),r=i.length?o.Query:o.Mutation,!i.length&&!l.length&&(r=o.Subscription);var F=i.length?i:l.length?l:d;c(F.length===1,97,e,F.length);var b=F[0];n=b.variableDefinitions||[],b.name&&b.name.kind==="Name"?t=b.name.value:t="data";var w={name:t,type:r,variables:n};return f.set(e,w),w}C.resetCache=function(){f=void 0};globalThis.__DEV__!==!1&&R("parser",function(){return f?f.size:0});function P(e,a){var n=S("parser",C,[e]),r=y(a),t=y(n.type);c(n.type===a,98,r,r,t)}function U(e,a,n,r){"use no memo";r===void 0&&(r="Please remove this option.");var t=D.useRef(!1);globalThis.__DEV__!==!1&&a in e&&!t.current&&(_(e,a,n,r),t.current=!0)}const J=p`
  query OfertasDestino($destinoId: ID!) {
    ofertasDestino(destinoId: $destinoId) {
      destinoId
      vuelos {
        id
        aerolinea
        codigo
        origen
        salida
        regreso
        escalas
        duracionHoras
        precio
        cupos
        capacidad
      }
      hoteles {
        id
        nombre
        categoria
        zona
        precioNoche
        disponibleDesde
        disponibleHasta
        habitaciones
        capacidad
        etiquetas
      }
    }
  }
`,X=p`
  mutation GuardarItinerario($input: ItinerarioInput!) {
    guardarItinerario(input: $input) {
      id
      estado
      noches
      total
    }
  }
`;export{o as D,X as G,J as O,B as a,U as u,P as v};
