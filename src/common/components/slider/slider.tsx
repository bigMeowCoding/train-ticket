import "./slider.scss";
import {
  FC,
  memo,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import React from "react";
import leftPad from "left-pad";
import useWinSize from "../../hooks/useWinSize";

const Slider: FC<{
  title: string;
  currentStartHours: number;
  currentEndHours: number;
  onEndChanged: Function;
  onStartChanged: Function;
}> = memo(function ({
  title,
  currentStartHours,
  currentEndHours,
  onEndChanged,
  onStartChanged,
}) {
  const startHandle = useRef<any>();
  const endHandle = useRef<any>();
  const range = useRef<any>();

  const lastStartX = useRef<number>();
  const lastEndX = useRef<number>();
  const rangeWidth = useRef<number>();
  const winSize = useWinSize();

  const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);

  const prevCurrentStartHours = useRef(currentStartHours);
  const prevCurrentEndHours = useRef(currentEndHours);
  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart((currentStartHours / 24) * 100);
    prevCurrentStartHours.current = currentStartHours;
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd((currentEndHours / 24) * 100);
    prevCurrentEndHours.current = currentEndHours;
  }
  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    );
  }, [winSize.width]);
  function onStartTouchBegin(e: TouchEvent) {
    const touch = e.targetTouches[0];
    (lastStartX as MutableRefObject<any>).current = touch.pageX;
  }

  function onEndTouchBegin(e: TouchEvent) {
    const touch = e.targetTouches[0];
    (lastEndX as MutableRefObject<any>).current = touch.pageX;
  }

  function onStartTouchMove(e: TouchEvent) {
    const touch = e.targetTouches[0];
    const current: number = lastStartX.current || 0;
    const distance = touch.pageX - current;
    lastStartX.current = touch.pageX;
    setStart((start) => start + (distance / (rangeWidth.current || 0)) * 100);
  }

  function onEndTouchMove(e: TouchEvent) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - (lastEndX.current || 0);
    lastEndX.current = touch.pageX;

    setEnd((end) => end + (distance / (rangeWidth.current || 0)) * 100);
  }

  useEffect(() => {
    if (startHandle.current) {
      (startHandle as MutableRefObject<any>).current.addEventListener(
        "touchstart",
        onStartTouchBegin,
        false
      );
      (startHandle as MutableRefObject<any>).current.addEventListener(
        "touchmove",
        onStartTouchMove,
        false
      );
    }
    if (endHandle.current) {
      (endHandle as MutableRefObject<any>).current.addEventListener(
        "touchstart",
        onEndTouchBegin,
        false
      );
      (endHandle as MutableRefObject<any>).current.addEventListener(
        "touchmove",
        onEndTouchMove,
        false
      );
    }

    return () => {
      if (startHandle.current) {
        (startHandle as MutableRefObject<any>).current.removeEventListener(
          "touchstart",
          onStartTouchBegin,
          false
        );
        (startHandle as MutableRefObject<any>).current.removeEventListener(
          "touchmove",
          onStartTouchMove,
          false
        );
      }
      if (endHandle.current) {
        (endHandle as MutableRefObject<any>).current.removeEventListener(
          "touchstart",
          onEndTouchBegin,
          false
        );
        (endHandle as MutableRefObject<any>).current.removeEventListener(
          "touchmove",
          onEndTouchMove,
          false
        );
      }
    };
  });
  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100;
    }

    if (start < 0) {
      return 0;
    }

    return start;
  }, [start]);

  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100;
    }

    if (end < 0) {
      return 0;
    }

    return end;
  }, [end]);
  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100);
  }, [startPercent]);

  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100);
  }, [endPercent]);
  const startText = useMemo(() => {
    return leftPad(startHours, 2, "0") + ":00";
  }, [startHours]);

  const endText = useMemo(() => {
    return leftPad(endHours, 2, "0") + ":00";
  }, [endHours]);

  useEffect(() => {
    onStartChanged(startHours);
  }, [startHours]);

  useEffect(() => {
    onEndChanged(endHours);
  }, [endHours]);

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-range"
            style={{
              left: startPercent + "%",
              width: endPercent - startPercent + "%",
            }}
          ></div>
          <i
            ref={startHandle}
            className="slider-handle"
            style={{
              left: startPercent + "%",
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className="slider-handle"
            style={{
              left: endPercent + "%",
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  );
});
export default Slider;
