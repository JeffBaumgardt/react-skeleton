import React from 'react'
import isEqual from 'lodash.isequal'

function useDeepCompareMemoize(value: Readonly<any>) {
    const ref = React.useRef<any>()

    if (!isEqual(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}

export function useDeepCompareEffect<T>(callback: React.EffectCallback, dependencies: T) {
    React.useEffect(callback, useDeepCompareMemoize(dependencies))
}
