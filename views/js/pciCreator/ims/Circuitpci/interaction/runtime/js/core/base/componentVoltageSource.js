define([
        'CircuitPCI/interaction/runtime/js/core/componentDoubleEnded',
        'CircuitPCI/interaction/runtime/js/core/math',
    ],
    function(ComponentDoubleEnded, MathUtils) {
        'use strict';

        function componentVoltageSource(pos) {

            var obj1 = {
                voltage: 5,
                isVoltageSource: true,
                dcBias: 0,
                frequency: 60,
                amplitude: 5,
                phaseOffset: 0,
                getSaveId: function getSaveId() {
                    return "vs"
                },
                getName: function getName() {
                    return "Voltage Source"
                },
                saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + ",0," +
                        MathUtils.valueToStringWithUnitPrefix(this.dcBias) + "," +
                        MathUtils.valueToStringWithUnitPrefix(this.frequency) + "," +
                        MathUtils.valueToStringWithUnitPrefix(this.amplitude) + "," +
                        MathUtils.valueToStringWithUnitPrefix(this.phaseOffset) + ","
                },


                loadFromString: function loadFromString(manager, loadData, reader) {
                    //super.loadFromString(manager, loadData, reader)
                    const version = parseInt(reader.read())
                    this.dcBias = reader.readNumber()
                    this.frequency = reader.readNumber()
                    this.amplitude = reader.readNumber()
                    this.phaseOffset = reader.readNumber()
                },
                calculateVoltage: function calculateVoltage(manager) {
                    return this.dcBias + Math.sin((this.phaseOffset / 180 * Math.PI) + (manager.time * Math.PI * 2 * this.frequency)) * this.amplitude
                },
                solverBegin: function solverBegin(manager, solver) {
                    solver.stampVoltage(this.voltageSourceIndex, this.nodes[0], this.nodes[1], this.calculateVoltage(manager))
                },
                solverIterationBegin: function solverIterationBegin(manager, solver) {
                    solver.stampVoltage(this.voltageSourceIndex, this.nodes[0], this.nodes[1], this.calculateVoltage(manager))
                },
                solverIterationEnd: function solverIterationEnd(manager, solver) {
                    this.current = -manager.getVoltageSourceCurrent(this.voltageSourceIndex)
                },
                getEditBox: function getEditBox(editBoxDef) {
                    editBoxDef.addNumberInput("Amplitude", "V", this.amplitude, (x) => { this.amplitude = x })
                    editBoxDef.addNumberInput("DC Bias", "V", this.dcBias, (x) => { this.dcBias = x })
                    editBoxDef.addNumberInput("Frequency", "Hz", this.frequency, (x) => { this.frequency = x })
                    editBoxDef.addNumberInput("Phase Offset", "deg", this.phaseOffset, (x) => { this.phaseOffset = x })
                },
                render: function render(manager, ctx) {
                    const symbolSize = Math.min(50, this.getLength())

                    const centerX = (this.points[0].x + this.points[1].x) / 2
                    const centerY = (this.points[0].y + this.points[1].y) / 2

                    this.drawSymbolBegin(manager, ctx, symbolSize)
                    this.drawSymbolEnd(manager, ctx)

                    ctx.save()
                    ctx.translate(centerX, centerY)

                    /* ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1])) */

                    ctx.beginPath()
                    ctx.arc(0, 0, symbolSize / 2, 0, Math.PI * 2)
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.moveTo(-symbolSize * 0.3, 0)
                    ctx.quadraticCurveTo(-symbolSize * 0.15, -symbolSize * 0.3, 0, 0)
                    ctx.quadraticCurveTo(symbolSize * 0.15, symbolSize * 0.3, symbolSize * 0.3, 0)
                    ctx.stroke()

                    ctx.restore()
                }

            }
            var obj2 = Object.create(ComponentDoubleEnded.add(pos));
            var ComponentVoltageSource = Object.assign(obj2, obj1);

            return ComponentVoltageSource;

        }



        return {
            add: function(pos) {
                return componentVoltageSource(pos)
            }
        };
    });