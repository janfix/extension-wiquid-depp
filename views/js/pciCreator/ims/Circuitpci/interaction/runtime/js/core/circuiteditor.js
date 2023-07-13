define([
        'taoQtiItem/portableLib/jquery_2_1_1',
        'CircuitPCI/interaction/runtime/js/core/base/componentWire',
        'CircuitPCI/interaction/runtime/js/core/circuitSolver',
        'CircuitPCI/interaction/runtime/js/core/base/componentBattery',
        'CircuitPCI/interaction/runtime/js/core/base/componentResistor',
        'CircuitPCI/interaction/runtime/js/core/base/componentCurrentSource',
        'CircuitPCI/interaction/runtime/js/core/base/componentCapacitor',
        'CircuitPCI/interaction/runtime/js/core/base/componentInductor',
        'CircuitPCI/interaction/runtime/js/core/base/componentVoltageSource',
        'CircuitPCI/interaction/runtime/js/core/base/componentGround',
        'CircuitPCI/interaction/runtime/js/core/depp/componentDiodeLumi',
        'CircuitPCI/interaction/runtime/js/core/depp/componentInterFerm',
        'CircuitPCI/interaction/runtime/js/core/depp/componentInterOuv',
        'CircuitPCI/interaction/runtime/js/core/depp/componentLampe',
        'CircuitPCI/interaction/runtime/js/core/depp/componentMoteur',
        'CircuitPCI/interaction/runtime/js/core/depp/componentResistor'
    ],
    function($,
        ComponentWire,
        CircuitSolver,
        ComponentBattery,
        ComponentResistor,
        componentCurrentSource,
        componentCapacitor,
        componentInductor,
        componentVoltageSource,
        ComponentGround,
        componentDiodeLumi,
        componentInterFerm,
        componentInterOuv,
        componentLampe,
        componentMoteur,
        componentResistance
    ) {

        'use strict';

        function circuitEditor($container, config, Kanvas) {

            var CircuitEditor = {
                canvas: Kanvas,
                ctx: Kanvas.getContext("2d"),
                width: parseInt(Kanvas.width),
                height: parseInt(Kanvas.height),
                tileSize: 25,
                time: 0,
                timePerIteration: 1e-6,
                components: [],
                componentsForEditing: [],
                solver: Object.create(CircuitSolver.add()),
                joints: new Map(),
                nodes: [],
                groundNodeIndex: -1,
                voltageSources: 0,
                cameraPos: { x: 0, y: 0 },
                cameraZoomLevel: 0,
                mouseDown: false,
                mousePos: null,
                mousePosRaw: null,
                mousePosSnapped: null,
                mouseDragOrigin: null,
                mouseDragOriginRaw: null,
                mouseDragOriginSnapped: null,
                mouseAddComponentClass: null,
                mouseCurrentAction: null,
                mouseCurrentHoverData: null,
                refreshUI: () => {}, // Attention HERE ! 
                debugDrawClean: false,
                debugSkipIterationFrames: 0,
                debugSkipIterationFramesCur: 0,
                run: function run() {
                    this.debugSkipIterationFramesCur++
                        if (this.debugSkipIterationFramesCur >= this.debugSkipIterationFrames) {
                            this.debugSkipIterationFramesCur = 0

                            if (this.solver != null && this.solver.readyToRun && this.components.length > 0) {
                                for (const component of this.components)
                                    component.solverFrameBegin(this, this.solver)

                                const iters = 50
                                const initialTime = this.time

                                for (let iter = 0; iter < iters; iter++) {
                                    this.time = initialTime + iter * this.timePerIteration

                                    this.solver.beginIteration()

                                    for (const component of this.components)
                                        component.solverIterationBegin(this, this.solver)

                                    this.solver.solve()

                                    for (const component of this.components)
                                        component.solverIterationEnd(this, this.solver)
                                }

                                for (const component of this.components)
                                    component.solverFrameEnd(this, this.solver)

                                this.time = initialTime + iters * this.timePerIteration
                            }

                            for (const component of this.components)
                                component.updateCurrentAnim(this, 1)
                        }

                    this.render()

                    window.requestAnimationFrame(() => this.run())

                },
                resize: function resize(width, height) {
                    this.width = width
                    this.height = height
                    this.canvas.width = width
                    this.canvas.height = height
                    this.render()
                },
                getAbsolutePosition: function getAbsolutePosition(pos) {
                    const zoom = this.getZoomFactor(this.cameraZoomLevel)
                    const rect = this.canvas.getBoundingClientRect()

                    return {
                        x: (pos.x - this.cameraPos.x) * zoom + this.width / 2 + rect.left,
                        y: (pos.y - this.cameraPos.y) * zoom + this.height / 2 + rect.top
                    }
                },
                getRawMousePos: function getRawMousePos(ev) {
                    const rect = this.canvas.getBoundingClientRect()
                    return {
                        x: ev.clientX - rect.left,
                        y: ev.clientY - rect.top
                    }
                },
                transformRawPos: function transformRawPos(pos) {
                    const zoom = this.getZoomFactor(this.cameraZoomLevel)

                    return {
                        x: (pos.x - this.width / 2) / zoom + this.cameraPos.x,
                        y: (pos.y - this.height / 2) / zoom + this.cameraPos.y
                    }
                },
                snapPos: function snapPos(pos) {
                    return {
                        x: Math.round(pos.x / this.tileSize) * this.tileSize,
                        y: Math.round(pos.y / this.tileSize) * this.tileSize
                    }
                },
                getHoverData: function getHoverData(pos) {
                    let data = null

                    for (let component of this.components) {
                        const hover = component.getHover(pos)
                        if (hover == null)
                            continue

                        if (data == null ||
                            hover.distSqr < data.distSqr) {
                            //data = {...hover, component }
                            data = Object.assign({}, hover, { component });
                        }
                    }

                    return data
                },
                getZoomFactor: function getZoomFactor(level) {
                    if (level >= 0)
                        return 1 + level
                    else
                        return 1 / (-level + 1)
                },
                onMouseDown: function onMouseDown(ev) {
                    //console.log(this)
                    ev.preventDefault()

                    if (this.mouseDown)
                        return

                    this.mousePosRaw = this.getRawMousePos(ev)
                    this.mousePos = this.transformRawPos(this.mousePosRaw)
                    this.mousePosSnapped = this.snapPos(this.mousePos)

                    this.mouseDragOriginRaw = this.mousePosRaw
                    this.mouseDragOrigin = this.mousePos
                    this.mouseDragOriginSnapped = this.mousePosSnapped

                    this.mouseDown = true
                    this.mouseCurrentAction = null
                    this.componentsForEditing = []

                    //console.log(ev.button)

                    if (!ev.ctrlKey) // && (this.mouseCurrentHoverData.component == null || !this.mouseCurrentHoverData.component.isAnySelected()))
                        this.unselectAll()

                    if (ev.button != 0) {

                        this.mouseCurrentAction = "pan"
                    } else if (this.mouseAddComponentClass != null) {
                        this.mouseCurrentAction = "drag"
                            //console.log("Posi Tracker")
                            //console.log(this.mousePosSnapped)
                            //let component = new (this.mouseAddComponentClass).add(this.mousePosSnapped)
                        let component = Object.create(this.mouseAddComponentClass.add(this.mousePosSnapped))
                        component.selected[1] = true
                        component.dragStart()
                        this.components.push(component)
                            //console.log(this.components)
                    } else if (this.mouseCurrentHoverData != null) {
                        this.mouseCurrentAction = "drag"

                        for (let component of this.components)
                            component.dragStart()

                        if (this.mouseCurrentHoverData.kind == "full") {
                            for (let i = 0; i < this.mouseCurrentHoverData.component.selected.length; i++)
                                this.mouseCurrentHoverData.component.selected[i] = true

                            for (let component of this.components)
                                for (let i = 0; i < component.points.length; i++)
                                    for (let j = 0; j < this.mouseCurrentHoverData.component.points.length; j++) {
                                        if (component.points[i].x == this.mouseCurrentHoverData.component.points[j].x &&
                                            component.points[i].y == this.mouseCurrentHoverData.component.points[j].y)
                                            component.selected[i] = true
                                    }
                        } else if (this.mouseCurrentHoverData.kind == "vertex") {
                            this.mouseCurrentHoverData.component.selected[this.mouseCurrentHoverData.index] = true
                        } else if (this.mouseCurrentHoverData.kind == "junction") {
                            const x = this.mouseCurrentHoverData.component.points[this.mouseCurrentHoverData.index].x
                            const y = this.mouseCurrentHoverData.component.points[this.mouseCurrentHoverData.index].y

                            for (let component of this.components)
                                for (let i = 0; i < component.points.length; i++) {
                                    if (component.points[i].x == x && component.points[i].y == y)
                                        component.selected[i] = true
                                }
                        }
                    }

                    this.refreshUI()
                    this.render()
                },
                onMouseMove: function onMouseMove(ev) {
                    ev.preventDefault()

                    const mousePosRawLast = this.mousePosRaw
                    this.mousePosRaw = this.getRawMousePos(ev)
                    this.mousePos = this.transformRawPos(this.mousePosRaw)
                    this.mousePosSnapped = this.snapPos(this.mousePos)

                    this.mouseCurrentHoverData = this.getHoverData(this.mousePos)

                    if (this.mouseDown) {
                        if (this.mouseCurrentAction == "pan") {
                            const deltaPosRaw = {
                                x: this.mousePosRaw.x - mousePosRawLast.x,
                                y: this.mousePosRaw.y - mousePosRawLast.y
                            }

                            const zoom = this.getZoomFactor(this.cameraZoomLevel)
                            this.cameraPos.x -= deltaPosRaw.x / zoom
                            this.cameraPos.y -= deltaPosRaw.y / zoom
                        } else if (this.mouseCurrentAction == "drag") {
                            const dragPosSnapped = {
                                x: this.mousePosSnapped.x - this.mouseDragOriginSnapped.x,
                                y: this.mousePosSnapped.y - this.mouseDragOriginSnapped.y
                            }

                            for (let component of this.components)
                                component.dragMove(this, dragPosSnapped)
                        }

                        this.refreshNodes()
                        this.render()
                    }
                },
                onMouseUp: function onMouseUp(ev) {
                    ev.preventDefault()

                    if (!this.mouseDown)
                        return

                    this.componentsForEditing = []

                    if (this.mouseCurrentAction == "pan" && this.mouseCurrentHoverData != null)
                        this.componentsForEditing = [this.mouseCurrentHoverData.component]

                    this.mouseDown = false
                    this.removeDegenerateComponents()
                    this.refreshNodes()
                    this.render()
                    this.refreshUI()
                },
                onMouseWheel: function onMouseWheel(ev) {
                    ev.preventDefault()

                    if (this.mousePosRaw == null)
                        return

                    const prevMousePos = this.transformRawPos(this.mousePosRaw)

                    this.cameraZoomLevel += (ev.deltaY > 0 ? -1 : ev.deltaY < 0 ? 1 : 0)

                    const newMousePos = this.transformRawPos(this.mousePosRaw)

                    this.cameraPos.x -= newMousePos.x - prevMousePos.x
                    this.cameraPos.y -= newMousePos.y - prevMousePos.y

                    this.render()
                },
                onKeyDown: function onKeyDown() {
                    var that = this;
                    $(document).on("keydown", function(ev) {
                        console.log("Inside Keyboard Listener")
                        if (ev.key == "Delete" || ev.key == "Backspace") {
                            ev.preventDefault()
                            console.log("PRESS DELETE OR BACKSPACE")
                            console.log(that.components)
                            const hasOneFullySelected = that.components.reduce((acc, c) => acc || c.isFullySelected(), false)

                            for (let i = that.components.length - 1; i >= 0; i--) {
                                if ((hasOneFullySelected && that.components[i].isFullySelected()) ||
                                    (!hasOneFullySelected && that.components[i].isAnySelected())) {
                                    that.components.splice(i, 1)
                                }
                            }

                            that.refreshNodes()
                        }
                    })
                },
                unselectAll: function unselectAll() {
                    for (let component of this.components)
                        for (let i = 0; i < component.selected.length; i++)
                            component.selected[i] = false
                },
                removeComponentsForEditing: function removeComponentsForEditing() {
                    for (const componentForEditing of this.componentsForEditing)
                        this.components = this.components.filter(c => c !== componentForEditing)

                    this.componentsForEditing = []
                    this.refreshNodes()
                    this.render()
                },
                removeDegenerateComponents: function removeDegenerateComponents() {
                    for (let i = this.components.length - 1; i >= 0; i--) {
                        if (this.components[i].isDegenerate())
                            this.components.splice(i, 1)
                    }
                },
                refreshNodes: function refreshNodes() {
                    this.joints = new Map()
                    this.nodes = [{}]
                    this.groundNodeIndex = 0
                    this.voltageSources = 0

                    const jointKey = (p) => Math.floor(p.x / this.tileSize).toString() + "," + Math.floor(p.y / this.tileSize).toString()

                    // Assign ground nodes.
                    let hasGround = false
                    for (let component of this.components) {
                        if (component.getName() === "Ground") { // Suppression de la syntaxe instanceof
                            hasGround = true
                                /* const joint = { jointIndex: this.joints.size, nodeIndex: 0, pos: component.points[0], outgoingDirections: [], labelDirection: 0, visible: true }
                                this.joints.set(jointKey(component.points[0]), joint) */
                        }
                    }

                    // Assign ground node to a voltage source if no ground components.
                    if (!hasGround) {
                        for (let component of this.components) {
                            if (component.getName() === "Batterie" || component.getName() === "Voltage Source") {
                                const key = jointKey(component.points[0])

                                let joint = this.joints.get(key)
                                if (!joint) {
                                    joint = { jointIndex: this.joints.size, nodeIndex: 0, pos: component.points[0], outgoingDirections: [], labelDirection: 0, visible: true }
                                    this.joints.set(key, joint)
                                }

                                break
                            }
                        }
                    }

                    // Assign joints.
                    for (let component of this.components) {
                        if (component.isVoltageSource)
                            component.voltageSourceIndex = (this.voltageSources++)

                        for (let i = 0; i < component.points.length; i++) {
                            const key = jointKey(component.points[i])

                            let joint = this.joints.get(key)
                            if (!joint) {
                                joint = { jointIndex: this.joints.size, nodeIndex: -1, pos: component.points[i], outgoingDirections: [], labelDirection: 0, visible: true }
                                this.joints.set(key, joint)
                            }

                            joint.outgoingDirections.push(component.getOutgoingDirectionFromNode(i))
                        }
                    }

                    // Assign nodes to joints.
                    for (let component of this.components) {
                        for (let i = 0; i < component.points.length; i++) {
                            const isNode = !(i == 1 && component.endType() === "Single")

                            const key = jointKey(component.points[i])

                            let joint = this.joints.get(key)
                            if (isNode && joint.nodeIndex < 0) {
                                joint.nodeIndex = this.nodes.length
                                this.nodes.push({})
                            }

                            component.nodes[i] = joint.nodeIndex
                            component.joints[i] = joint.jointIndex

                        }
                    }



                    // Find voltage label position for joints.
                    for (let [key, joint] of this.joints) {
                        if (joint.outgoingDirections.length == 1)
                            joint.labelDirection = joint.outgoingDirections[0] + Math.PI

                        else {
                            joint.outgoingDirections.sort((a, b) => a - b)

                            let biggestGapSize = 0
                            for (let i = 0; i < joint.outgoingDirections.length; i++) {
                                const iNext = (i + 1) % joint.outgoingDirections.length

                                const curDir = joint.outgoingDirections[i]
                                const nextDir = joint.outgoingDirections[iNext]

                                const wrapAround = (nextDir < curDir ? Math.PI * 2 : 0)
                                const gapSize = (wrapAround * 2 + nextDir) - (wrapAround + curDir)

                                if (gapSize > biggestGapSize) {
                                    biggestGapSize = gapSize
                                    joint.labelDirection = curDir + gapSize / 2
                                }
                            }
                        }
                    }

                    //this.refreshSolver() //ATTENTION SOLVER NEUTRALISATION wiquid
                },
                refreshSolver: function refreshSolver() {
                    this.time = 0

                    for (const component of this.components)
                        component.reset(this)

                    this.solver.stampBegin(this.nodes.length, this.voltageSources, this.groundNodeIndex)

                    for (const component of this.components)
                        component.solverBegin(this, this.solver)

                    this.solver.stampEnd()
                },
                getVoltageSourceCurrent: function getVoltageSourceCurrent(voltageSourceIndex) {
                    return this.solver.getVoltageSourceCurrent(voltageSourceIndex)
                },
                getNodeVoltage: function getNodeVoltage(nodeIndex) {
                    return this.solver.getNodeVoltage(nodeIndex)
                },
                getVoltageColor: function getVoltageColor(voltage) {
                    const gray = 160

                    if (!voltage)
                        return "rgb(" + gray + "," + gray + "," + gray + ")"

                    if (voltage > 0) {
                        const factor = Math.min(1, voltage / 10)
                        const cGreen = Math.floor(gray + factor * (255 - gray))
                        const cOther = Math.floor(gray - factor * gray)
                        return "rgb(" + cOther + "," + cGreen + "," + cOther + ")"
                    } else {
                        const factor = Math.min(1, -voltage / 10)
                        const cRed = Math.floor(gray + factor * (255 - gray))
                        const cOther = Math.floor(gray - factor * gray)
                        return "rgb(" + cRed + "," + cOther + "," + cOther + ")"
                    }
                },
                render: function render() { //Rendering the canvas activelly with a constant refresh
                    this.ctx.save()
                    if (this.debugDrawClean)
                        this.ctx.clearRect(0, 0, this.width, this.height)
                    else {
                        //this.ctx.fillStyle = "#000022"
                        this.ctx.fillStyle = "grey"
                        this.ctx.fillRect(0, 0, this.width, this.height)
                    }

                    if (this.components.length == 0) {
                        this.ctx.font = "15px Verdana"
                        this.ctx.textAlign = "center"
                        this.ctx.textBaseline = "middle"
                        this.ctx.fillStyle = "#aac"
                        this.ctx.fillText("Selectionner un composant et dessiner ici votre circuit!", this.width / 2, this.height / 2)
                    }

                    this.ctx.fillStyle = "#aac"
                    this.ctx.font = "15px Verdana"
                    this.ctx.textAlign = "left"
                    this.ctx.textBaseline = "top"
                        // this.ctx.fillText("t = " + this.time.toFixed(3) + " s", 10, 10)

                    const zoom = this.getZoomFactor(this.cameraZoomLevel)
                    this.ctx.translate(this.width / 2, this.height / 2)
                    this.ctx.scale(zoom, zoom)
                    this.ctx.translate(-this.cameraPos.x, -this.cameraPos.y)

                    this.ctx.lineWidth = 4
                    this.ctx.lineCap = "round"

                    this.ctx.strokeStyle = "#26a"
                    this.ctx.fillStyle = "#26a"
                    for (const component of this.components)
                        component.renderSelection(this, this.ctx)

                    this.ctx.strokeStyle = "#4af"
                    this.ctx.fillStyle = "#4af"
                    if (this.mouseCurrentHoverData != null && this.mouseAddComponentClass == null && !this.mouseDown)
                        this.mouseCurrentHoverData.component.renderHover(this, this.ctx, this.mouseCurrentHoverData)

                    this.ctx.strokeStyle = "#f80"
                    this.ctx.fillStyle = "#f80"
                    for (const component of this.componentsForEditing)
                        component.renderEditing(this, this.ctx)

                    for (const component of this.components)
                        component.render(this, this.ctx)

                    if (!this.mouseDown)
                        for (const component of this.components)
                            component.renderCurrent(this, this.ctx)

                    this.drawNodeVoltages()
                        //this.drawDebugNodes()

                    if (!this.mouseDown && this.mousePosSnapped != null && this.mouseAddComponentClass != null) {
                        this.ctx.fillStyle = "#eeeeee"
                        this.ctx.beginPath()
                        this.ctx.arc(this.mousePosSnapped.x, this.mousePosSnapped.y, 6, 0, Math.PI * 2)
                        this.ctx.fill()
                    }

                    this.ctx.restore()
                },
                drawDebugNodes: function drawDebugNodes() {
                    this.ctx.font = "15px Verdana"
                    for (const component of this.components)
                        for (let i = 0; i < component.points.length; i++) {
                            this.ctx.fillStyle = (component.nodes[i] == this.groundNodeIndex ? "#888888" : "#ffffff")
                            this.ctx.fillText(component.nodes[i].toString(), component.points[i].x - 15, component.points[i].y - 15)
                        }

                    this.ctx.fillStyle = "#00ff00"
                    for (const component of this.components)
                        if (component.isVoltageSource)
                            this.ctx.fillText(component.voltageSourceIndex.toString(), component.points[1].x + 15, component.points[1].y - 15)
                },
                drawNodeVoltages: function drawNodeVoltages() {
                    this.ctx.font = "15px Verdana"
                    this.ctx.textBaseline = "middle"

                    for (const [key, joint] of this.joints) {
                        if (!joint.visible)
                            continue

                        const xOffset = 15 * Math.cos(joint.labelDirection)
                        const yOffset = 15 * -Math.sin(joint.labelDirection)

                        if (Math.abs(xOffset) < Math.abs(yOffset) * 0.1)
                            this.ctx.textAlign = "center"
                        else if (xOffset > 0)
                            this.ctx.textAlign = "left"
                        else
                            this.ctx.textAlign = "right"

                        const v = this.getNodeVoltage(joint.nodeIndex)
                        const str = v.toFixed(3) + " V"

                        // this.ctx.fillStyle = this.getVoltageColor(v)
                        // this.ctx.fillText(str, joint.pos.x + xOffset, joint.pos.y + yOffset)
                    }
                },
                fitCircuitToCamera: function fitCircuitToCamera() {
                    this.cameraPos = { x: 0, y: 0 }
                    this.cameraZoomLevel = 0

                    let totalBBox = null
                    for (const c of this.components) {
                        const bbox = c.getBBox()
                        if (totalBBox == null)
                            totalBBox = bbox
                        else {
                            totalBBox.xMin = Math.min(totalBBox.xMin, bbox.xMin)
                            totalBBox.yMin = Math.min(totalBBox.yMin, bbox.yMin)
                            totalBBox.xMax = Math.max(totalBBox.xMax, bbox.xMax)
                            totalBBox.yMax = Math.max(totalBBox.yMax, bbox.yMax)
                        }
                    }

                    if (totalBBox != null) {
                        this.cameraPos.x = (totalBBox.xMin + totalBBox.xMax) / 2
                        this.cameraPos.y = (totalBBox.yMin + totalBBox.yMax) / 2

                        const circuitW = totalBBox.xMax - totalBBox.xMin + this.tileSize * 3
                        const circuitH = totalBBox.yMax - totalBBox.yMin + this.tileSize * 3

                        while (this.cameraZoomLevel > -50) {
                            const screenMin = this.transformRawPos({ x: 0, y: 0 })
                            const screenMax = this.transformRawPos({ x: this.width, y: this.height })

                            const screenW = screenMax.x - screenMin.x
                            const screenH = screenMax.y - screenMin.y

                            if (screenW >= circuitW && screenH >= circuitH)
                                break

                            this.cameraZoomLevel -= 1
                        }
                    }
                },
                saveToString: function saveToString() {
                    console.log(this.joints)

                    let str = "";

                    //original
                    //let str = "0,"
                    //str += this.joints.size + ","

                    /* for (const [key, joint] of this.joints) {
                        str += (joint.pos.x / this.tileSize).toString() + ","
                        str += (joint.pos.y / this.tileSize).toString() + ","
                    } */


                    for (const component of this.components) {
                        console.log(component)

                        //str += component.getSaveId() + ","
                        if (component.getName() == "Cable") {
                            str += component.getName() + ","
                            str += component.saveToString(this) + "#,";
                        } else {
                            str += component.getName() + ","
                            str += component.saveToString(this);
                        }

                    }

                    $container.find(".raw").html(str);

                    return str
                },
                loadFromString: function loadFromString(str) {
                    let strParts = str.split(",")

                    let reader = {
                        index: 0,
                        isOver() { return this.index >= strParts.length },
                        read() { return strParts[this.index++] },
                        readNumber() { return MathUtils.stringWithUnitPrefixToValue(strParts[this.index++]) }
                    }

                    let loadData = {
                        joints: []
                    }

                    const version = parseInt(reader.read())
                    const jointNum = parseInt(reader.read())

                    for (let i = 0; i < jointNum; i++) {
                        const x = parseInt(reader.read()) * this.tileSize
                        const y = parseInt(reader.read()) * this.tileSize
                        loadData.joints.push({ x, y })
                    }

                    const componentClasses = [
                        ComponentWire.add(),
                        ComponentBattery.add(),
                        ComponentResistor.add(),
                        componentCurrentSource.add(),
                        componentCapacitor.add(),
                        componentInductor.add(),
                        componentVoltageSource.add(),
                        ComponentGround.add(),
                        componentDiodeLumi.add(),
                        componentInterFerm.add(),
                        componentInterOuv.add(),
                        componentLampe.add(),
                        componentMoteur.add(),
                        componentResistance.add()
                    ]

                    let componentIds = new Map()
                    for (const c of componentClasses)
                        componentIds.set(c.getSaveId(), c);


                    while (!reader.isOver()) {
                        const id = reader.read()
                        if (id == null || id == "")
                            break
                        const componentClass = componentIds.get(id);
                        const component = new componentClass({ x: 0, y: 0 })
                        component.loadFromString(this, loadData, reader)

                        this.components.push(component)
                    }

                    this.removeDegenerateComponents()
                    this.fitCircuitToCamera()
                    this.refreshNodes()
                    this.render()
                }
            }

            //Chapter I : Event

            function getZoomFactor(level) {
                if (level >= 0)
                    return 1 + level
                else
                    return 1 / (-level + 1)
            }


            function resize(width, height) {
                this.width = width
                this.height = height

                this.canvas.width = width
                this.canvas.height = height

                this.render()
            }


            function getAbsolutePosition(that, pos) {
                const zoom = that.getZoomFactor(that.cameraZoomLevel)
                const rect = that.canvas.getBoundingClientRect()

                return {
                    x: (pos.x - that.cameraPos.x) * zoom + that.width / 2 + rect.left,
                    y: (pos.y - that.cameraPos.y) * zoom + that.height / 2 + rect.top
                }
            }


            function getRawMousePos(ev, that) {
                const rect = that.ctx.canvas.getBoundingClientRect()
                return {
                    x: ev.clientX - rect.left,
                    y: ev.clientY - rect.top
                }
            }


            function transformRawPos(that, pos) {
                const zoom = getZoomFactor(that.cameraZoomLevel)

                return {
                    x: (pos.x - that.width / 2) / zoom + that.cameraPos.x,
                    y: (pos.y - that.height / 2) / zoom + that.cameraPos.y
                }
            }


            function snapPos(that, pos) {
                return {
                    x: Math.round(pos.x / that.tileSize) * that.tileSize,
                    y: Math.round(pos.y / that.tileSize) * that.tileSize
                }
            }


            function getHoverData(pos) {
                let data = null

                for (let component of this.components) {
                    const hover = component.getHover(pos)
                    if (hover == null)
                        continue

                    if (data == null ||
                        hover.distSqr < data.distSqr) {
                        //data = {...hover, component }
                        data = Object.assign({}, hover, { component });
                    }
                }

                return data
            }


            $(Kanvas).on("mousedown", function(e) { CircuitEditor.onMouseDown(e) })
            $(Kanvas).on("mousemove", function(e) { CircuitEditor.onMouseMove(e) })
            $(Kanvas).on("mouseup", function(e) { CircuitEditor.onMouseUp(e) })
            $(Kanvas).on("mouseleave", function(e) { CircuitEditor.onMouseUp(e) })
            $(Kanvas).on("wheel", function(e) { CircuitEditor.onMouseWheel(e) })




            return CircuitEditor


        }



        return {
            add: function($container, config, Kanvas) {
                return circuitEditor($container, config, Kanvas)
            }
        };
    });