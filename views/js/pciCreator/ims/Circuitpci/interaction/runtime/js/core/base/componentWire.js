define([
        'CircuitPCI/interaction/runtime/js/core/componentDoubleEnded'
    ],
    function(ComponentDoubleEnded) {
        'use strict';

        function Wire(p) {
            var obj1 = {
                isVoltageSource: true,
                getSaveId: function getSaveId() {
                    return "w"
                },
                getName: function getName() {
                    return "Cable"
                },
                saveToString: function saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + ","
                },
                solverBegin: function(manager, solver) {
                    solver.stampVoltage(this.voltageSourceIndex, this.nodes[0], this.nodes[1], 0)
                },
                solverIterationEnd: function(manager, solver) {
                    this.current = -manager.getVoltageSourceCurrent(this.voltageSourceIndex)
                },
                render: function(manager, ctx) {
                    //console.log("RENDER WIRE")
                    ctx.save()

                    ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0]))

                    ctx.beginPath()
                    ctx.strokeStyle = "#ff8800"
                    ctx.arc(this.points[0].x, this.points[0].y, 2, 0, Math.PI * 2)
                    ctx.moveTo(this.points[0].x, this.points[0].y)
                    ctx.lineTo(this.points[1].x, this.points[1].y)
                    ctx.arc(this.points[1].x, this.points[1].y, 2, 0, Math.PI * 2)
                    ctx.stroke()

                    ctx.restore()
                }




            }
            var obj2 = Object.create(ComponentDoubleEnded.add(p));
            var ComponentWire = Object.assign(obj2, obj1);

            return ComponentWire;
        }



        return {
            add: function(p) {
                return Wire(p)
            }
        };
    });