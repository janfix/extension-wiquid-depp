define([
        'CircuitPCI/interaction/runtime/js/core/matrix'
    ],
    function(Matrix) {
        'use strict';

        function circuitSolver() {


            var CircuitSolver = {
                readyToStamp: false,
                readyToRun: false,
                matrixG: null,
                matrixB: null,
                matrixC: null,
                matrixI: null,
                matrixE: null,
                matrixIOriginal: null,
                matrixEOriginal: null,
                matrixA: null,
                matrixZ: null,
                matrixAPivots: null,
                solution: null,

                stampBegin: function stampBegin(nodeNum, voltNum, groundNodeIndex) {
                    this.readyToStamp = true
                    this.readyToRun = false

                    this.nodeNum = nodeNum
                    this.voltNum = voltNum
                    this.groundNodeIndex = groundNodeIndex

                    this.matrixG = Object.create(Matrix.add(nodeNum, nodeNum)) //new Matrix(nodeNum, nodeNum) ;
                    this.matrixB = Object.create(Matrix.add(voltNum, nodeNum)) //new Matrix(voltNum, nodeNum)
                    this.matrixC = Object.create(Matrix.add(nodeNum, voltNum)) //new Matrix(nodeNum, voltNum)

                    this.matrixI = Object.create(Matrix.add(1, nodeNum)) //new Matrix(1, nodeNum)
                    this.matrixE = Object.create(Matrix.add(1, voltNum)) //new Matrix(1, voltNum)

                    this.matrixIOriginal = null
                    this.matrixEOriginal = null

                    this.matrixA = null
                    this.matrixZ = null
                    this.matrixAPivots = null

                    this.solution = null
                },


                stampResistance: function stampResistance(node1, node2, resistance) {
                    this.matrixG.add(node1, node1, 1 / resistance)
                    this.matrixG.add(node2, node2, 1 / resistance)
                    this.matrixG.add(node1, node2, -1 / resistance)
                    this.matrixG.add(node2, node1, -1 / resistance)
                },


                stampVoltage: function stampVoltage(voltageSourceIndex, negNode, posNode, voltage) {
                    this.matrixB.set(voltageSourceIndex, posNode, 1)
                    this.matrixB.set(voltageSourceIndex, negNode, -1)

                    this.matrixC.set(posNode, voltageSourceIndex, 1)
                    this.matrixC.set(negNode, voltageSourceIndex, -1)

                    this.matrixE.set(0, voltageSourceIndex, voltage)
                },


                stampCurrentSource: function stampCurrentSource(negNode, posNode, current) {
                    this.matrixI.add(0, posNode, current)
                    this.matrixI.add(0, negNode, -current)
                },


                stampEnd: function stampEnd() {
                    // Consolidate into bigger matrices.
                    this.matrixA = Object.create(Matrix.add(this.nodeNum + this.voltNum, this.nodeNum + this.voltNum)) //new Matrix(this.nodeNum + this.voltNum, this.nodeNum + this.voltNum)
                    this.matrixG.copyTo(this.matrixA, 0, 0)
                    this.matrixB.copyTo(this.matrixA, this.nodeNum, 0)
                    this.matrixC.copyTo(this.matrixA, 0, this.nodeNum)

                    //console.log("---")
                    //console.log(this.matrixA.toString())
                    //console.log(this.matrixZ.toString())

                    if (this.nodeNum + this.voltNum <= 1)
                        return

                    // Remove ground node rows and columns.
                    this.matrixA = this.matrixA.removeRow(this.groundNodeIndex)
                    this.matrixA = this.matrixA.removeColumn(this.groundNodeIndex)

                    //console.log(this.matrixA.toString())
                    //console.log(this.matrixZ.toString())

                    //console.log("matrixA:")
                    //console.log(this.matrixA.toString())

                    this.matrixAPivots = this.matrixA.luDecompose()
                    if (this.matrixAPivots == null) {
                        //console.log("singular matrix")
                        return
                    }

                    //console.log("matrixA decomposed:")
                    //console.log(this.matrixA.toString())
                    //console.log("matrixA pivots:")
                    //console.log(this.matrixAPivots.toString())


                    this.matrixIOriginal = this.matrixI.clone()
                    this.matrixEOriginal = this.matrixE.clone()

                    this.readyToRun = true
                },


                beginIteration: function beginIteration() {
                    this.matrixI = this.matrixIOriginal.clone()
                    this.matrixE = this.matrixEOriginal.clone()
                },


                solve: function solve() {
                    if (this.matrixAPivots == null)
                        return

                    this.matrixZ = Object.create(Matrix.add(1, this.nodeNum + this.voltNum)) //new Matrix(1, this.nodeNum + this.voltNum)
                    this.matrixI.copyTo(this.matrixZ, 0, 0)
                    this.matrixE.copyTo(this.matrixZ, 0, this.nodeNum)
                    this.matrixZ = this.matrixZ.removeRow(this.groundNodeIndex)

                    this.solution = this.matrixA.luSolve(this.matrixAPivots, this.matrixZ).insertRow(this.groundNodeIndex)

                    console.log("solution:")
                    console.log(this.solution.toString())
                },


                getNodeVoltage: function getNodeVoltage(index) {
                    if (this.solution == null)
                        return 0

                    const v = this.solution.get(0, index)
                    if (isNaN(v))
                        return 0

                    return v
                },


                getVoltageSourceCurrent: function getVoltageSourceCurrent(voltageSourceIndex) {
                    if (this.solution == null)
                        return 0

                    const a = this.solution.get(0, this.nodeNum + voltageSourceIndex)
                    if (isNaN(a))
                        return 0

                    return a
                }

            }

            return CircuitSolver;

        }



        return {
            add: function() {
                return circuitSolver()
            }
        };
    });