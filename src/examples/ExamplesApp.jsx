import { useState } from 'react';
import WhatIsReactExample from './01-what-is-react/WhatIsReactExample';
import ComponentsJsxExample from './02-components-jsx/ComponentsJsxExample';
import PropsExample from './03-components-props/PropsExample';
import StateEventsExample from './04-state-events/StateEventsExample';
import ListsConditionalExample from './05-lists-conditional/ListsConditionalExample';
import StylingExample from './06-styling/StylingExample';
import PortalsRefsExample from './07-portals-refs/PortalsRefsExample';
import EffectsExample from './08-effects/EffectsExample';
import FormActionsExample from './09-form-actions/FormActionsExample';
import BehindScenesExample from './10-behind-scenes/BehindScenesExample';
import ComplexStateExample from './11-complex-state/ComplexStateExample';
import CustomHooksExample from './12-custom-hooks/CustomHooksExample';
import RoutingExample from './13-routing/RoutingExample';
import RoutingDataExample from './14-routing-data/RoutingDataExample';

const EXAMPLES = {
  '01 What is React': WhatIsReactExample,
  '02 Components & JSX': ComponentsJsxExample,
  '03 Props': PropsExample,
  '04 State & Events': StateEventsExample,
  '05 Lists & Conditional': ListsConditionalExample,
  '06 Styling': StylingExample,
  '07 Portals & Refs': PortalsRefsExample,
  '08 Effects': EffectsExample,
  '09 Form Actions': FormActionsExample,
  '10 Behind the Scenes': BehindScenesExample,
  '11 Complex State': ComplexStateExample,
  '12 Custom Hooks': CustomHooksExample,
  '13 Routing': RoutingExample,
  '14 Routing + Data': RoutingDataExample,
};

export default function ExamplesApp() {
  const [current, setCurrent] = useState(Object.keys(EXAMPLES)[0]);
  const Example = EXAMPLES[current];

  return (
    <main>
      <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Object.keys(EXAMPLES).map((name) => (
          <button
            key={name}
            onClick={() => setCurrent(name)}
            disabled={name === current}
          >
            {name}
          </button>
        ))}
      </nav>
      <Example key={current} />
    </main>
  );
}
