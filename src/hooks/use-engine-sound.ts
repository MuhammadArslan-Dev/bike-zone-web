"use client";

import { useEffect, useRef, useState } from "react";

export type EngineState =
  "start" | "idle" | "rev" | "acceleration" | "stop" | null;

const BASE_FREQ = 90;

export function useEngineSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const subOscRef = useRef<OscillatorNode | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const [activeState, setActiveState] = useState<EngineState>(null);

  useEffect(() => {
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    gain.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    gainRef.current = gain;
    analyserRef.current = analyser;

    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      oscRef.current?.stop();
      subOscRef.current?.stop();
      void ctx.close();
    };
  }, []);

  function clearTimers() {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }

  function ensureOscillators() {
    const ctx = audioCtxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    if (ctx.state === "suspended") void ctx.resume();

    if (!oscRef.current) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = BASE_FREQ;

      const sub = ctx.createOscillator();
      sub.type = "square";
      sub.frequency.value = BASE_FREQ / 2;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1200;

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(gain);

      osc.start();
      sub.start();

      oscRef.current = osc;
      subOscRef.current = sub;
    }
  }

  function rampGain(value: number, duration: number) {
    const ctx = audioCtxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(value, ctx.currentTime + duration);
  }

  function rampFreq(
    osc: OscillatorNode | null,
    value: number,
    duration: number,
  ) {
    const ctx = audioCtxRef.current;
    if (!ctx || !osc) return;
    osc.frequency.cancelScheduledValues(ctx.currentTime);
    osc.frequency.setValueAtTime(osc.frequency.value, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(value, ctx.currentTime + duration);
  }

  function playStart() {
    clearTimers();
    ensureOscillators();
    setActiveState("start");
    rampGain(0.25, 0.05);
    rampFreq(oscRef.current, BASE_FREQ, 0.6);
    rampFreq(subOscRef.current, BASE_FREQ / 2, 0.6);
    timeoutsRef.current.push(
      window.setTimeout(() => setActiveState("idle"), 700),
    );
  }

  function playIdle() {
    clearTimers();
    ensureOscillators();
    setActiveState("idle");
    rampGain(0.2, 0.3);
    rampFreq(oscRef.current, BASE_FREQ, 0.3);
    rampFreq(subOscRef.current, BASE_FREQ / 2, 0.3);
  }

  function playRev() {
    clearTimers();
    ensureOscillators();
    setActiveState("rev");
    rampGain(0.35, 0.1);
    rampFreq(oscRef.current, 420, 0.35);
    rampFreq(subOscRef.current, 210, 0.35);
    timeoutsRef.current.push(
      window.setTimeout(() => {
        rampFreq(oscRef.current, BASE_FREQ, 0.5);
        rampFreq(subOscRef.current, BASE_FREQ / 2, 0.5);
        rampGain(0.2, 0.5);
      }, 400),
      window.setTimeout(() => setActiveState("idle"), 1000),
    );
  }

  function playAcceleration() {
    clearTimers();
    ensureOscillators();
    setActiveState("acceleration");
    rampGain(0.35, 0.2);
    rampFreq(oscRef.current, 520, 2.2);
    rampFreq(subOscRef.current, 260, 2.2);
    timeoutsRef.current.push(
      window.setTimeout(() => {
        rampFreq(oscRef.current, BASE_FREQ, 0.8);
        rampFreq(subOscRef.current, BASE_FREQ / 2, 0.8);
        rampGain(0.2, 0.8);
        setActiveState("idle");
      }, 2200),
    );
  }

  function stopEngine() {
    clearTimers();
    if (!oscRef.current) {
      setActiveState(null);
      return;
    }
    setActiveState("stop");
    rampFreq(oscRef.current, 30, 0.5);
    rampFreq(subOscRef.current, 15, 0.5);
    rampGain(0, 0.6);
    timeoutsRef.current.push(
      window.setTimeout(() => {
        oscRef.current?.stop();
        oscRef.current?.disconnect();
        oscRef.current = null;
        subOscRef.current?.stop();
        subOscRef.current?.disconnect();
        subOscRef.current = null;
        setActiveState(null);
      }, 650),
    );
  }

  return {
    activeState,
    analyserRef,
    playStart,
    playIdle,
    playRev,
    playAcceleration,
    stopEngine,
  };
}
