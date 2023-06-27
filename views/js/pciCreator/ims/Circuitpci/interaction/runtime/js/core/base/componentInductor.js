define([
        'CircuitPCI/interaction/runtime/js/core/componentDoubleEnded',
        'CircuitPCI/interaction/runtime/js/core/math',
    ],
    function(ComponentDoubleEnded, MathUtils) {
        'use strict';

        function componentInductor(pos) {
            var obj1 = {
                inductance: 1,
                useTrapezoidalIntegration: true,
                companionModelResistance: 0,
                companionModelCurrent: 0,
                getSaveId: function getSaveId() {
                    return "l"
                },
                getName: function getName() {
                    return "Electroaimant"
                },
                saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + "," + MathUtils.valueToStringWithUnitPrefix(this.inductance) + ","
                },


                loadFromString: function loadFromString(manager, loadData, reader) {
                    //super.loadFromString(manager, loadData, reader)
                    this.inductance = reader.readNumber()
                },


                solverBegin: function solverBegin(manager, solver) {
                    this.current = 0
                    this.currentAnim = 0
                    this.companionModelCurrent = 0

                    if (this.useTrapezoidalIntegration) {
                        this.companionModelResistance = (2 * this.inductance) / manager.timePerIteration
                        solver.stampResistance(this.nodes[0], this.nodes[1], this.companionModelResistance)
                            //console.log("comp resistance (trapezoidal)", this.companionModelResistance)
                    } else {
                        this.companionModelResistance = this.inductance / manager.timePerIteration
                        solver.stampResistance(this.nodes[0], this.nodes[1], this.companionModelResistance)
                            //console.log("comp resistance (back euler)", this.companionModelResistance)
                    }
                },
                solverIterationBegin: function solverIterationBegin(manager, solver) {
                    const voltage = manager.getNodeVoltage(this.nodes[0]) - manager.getNodeVoltage(this.nodes[1])

                    if (this.useTrapezoidalIntegration) {
                        this.companionModelCurrent = voltage / this.companionModelResistance + this.current
                        solver.stampCurrentSource(this.nodes[0], this.nodes[1], this.companionModelCurrent)
                            //console.log("voltage, comp current (trapezoidal)", voltage, this.companionModelCurrent)
                    } else {
                        this.companionModelCurrent = this.current
                        solver.stampCurrentSource(this.nodes[0], this.nodes[1], this.companionModelCurrent)
                            //console.log("voltage, comp current (back euler)", voltage, this.companionModelCurrent)
                    }
                },
                solverIterationEnd: function solverIterationEnd(manager, solver) {
                    const voltage = manager.getNodeVoltage(this.nodes[0]) - manager.getNodeVoltage(this.nodes[1])

                    this.current = voltage / this.companionModelResistance + this.companionModelCurrent
                },
                getEditBox: function getEditBox(editBoxDef) {
                    editBoxDef.addNumberInput("Inductance", "H", this.inductance, (x) => { this.inductance = x })
                },
                render: function render(manager, ctx) {
                    const symbolSize = Math.min(75, this.getLength())
                    const arcNum = 3
                    const arcAmplitude = 25

                    this.drawSymbolBegin(manager, ctx, symbolSize)
                        /*  this.drawSymbolSetGradient(manager, ctx, symbolSize,
                             manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0])),
                             manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1]))) */

                    ctx.lineJoin = "round"

                    ctx.beginPath()
                    ctx.moveTo(-symbolSize / 2, 0)

                    for (let arc = 0; arc < arcNum; arc++) {
                        const arcX1 = -symbolSize / 2 + symbolSize / arcNum * (arc + 0)
                        const arcX2 = -symbolSize / 2 + symbolSize / arcNum * (arc + 1)

                        ctx.bezierCurveTo(
                            arcX1, arcAmplitude,
                            arcX2, arcAmplitude,
                            arcX2, 0)
                    }

                    ctx.stroke()

                    this.drawSymbolEnd(manager, ctx)
                    this.drawRatingText(manager, ctx, this.inductance, "H", 25)
                }
            };
            var obj2 = Object.create(ComponentDoubleEnded.add(pos));
            var ComponentInductor = Object.assign(obj2, obj1);

            return ComponentInductor;

        }

        return {
            add: function(pos) {
                return componentInductor(pos)
            }
        };
    });