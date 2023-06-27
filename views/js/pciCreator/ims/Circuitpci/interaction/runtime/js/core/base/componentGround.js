define([
        'CircuitPCI/interaction/runtime/js/core/componentSingleEnded'
    ],
    function(ComponentSingleEnded) {
        'use strict';

        function ComponentGround(pos) {
            var obj1 = {
                isVoltageSource: true,
                getSaveId: function getSaveId() {
                    return "g"
                },
                getName: function getName() {
                    return "Ground"
                },
                saveToString: function saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + ","
                },
                solverBegin: function solverBegin(manager, solver) {
                    solver.stampVoltage(this.voltageSourceIndex, this.nodes[0], 0, 0)
                },
                solverIterationEnd: function solverIterationEnd(manager, solver) {
                    this.current = -manager.getVoltageSourceCurrent(this.voltageSourceIndex)
                },
                render: function render(manager, ctx) {
                    const symbolSize = Math.min(20, this.getLength())
                    const smallStrokeSize = 2
                    const mediumStrokeSize = 10
                    const bigStrokeSize = 20

                    this.drawSymbolBegin(manager, ctx, symbolSize)

                    /*  ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0])) */

                    ctx.beginPath()
                    ctx.moveTo(-symbolSize / 2, -smallStrokeSize)
                    ctx.lineTo(-symbolSize / 2, smallStrokeSize)
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.moveTo(0, -mediumStrokeSize)
                    ctx.lineTo(0, mediumStrokeSize)
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.moveTo(symbolSize / 2, -bigStrokeSize)
                    ctx.lineTo(symbolSize / 2, bigStrokeSize)
                    ctx.stroke()

                    this.drawSymbolEnd(manager, ctx)
                }


            }

            var obj2 = Object.create(ComponentSingleEnded.add(pos));
            var ComponentGround = Object.assign(obj2, obj1);

            return ComponentGround;

        }



        return {
            add: function(pos) {
                return ComponentGround(pos)
            }
        };
    });