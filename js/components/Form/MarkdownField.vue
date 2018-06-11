<script>
import _ from 'lodash'
import marked from 'marked'
import CodeMirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import { FormField, HandlesValidationErrors } from '@/mixins'

const actions = {
    bold() {
        this.insertAround('**', '**')
    },

    italicize() {
        this.insertAround('*', '*')
    },

    image() {
        this.insertBefore('![](http://)', 2)
    },

    link() {
        this.insertAround('[', '](http://)')
    },

    toggleFullScreen() {
        this.fullScreen = !this.fullScreen
    },

    fullScreen() {
        this.fullScreen = true
    },

    exitFullScreen() {
        this.fullScreen = false
    },
}

const keyMaps = {
    'Cmd-B': 'bold',
    'Cmd-I': 'italicize',
    'Cmd-Alt-I': 'image',
    'Cmd-K': 'link',
    F11: 'fullScreen',
    Esc: 'exitFullScreen',
}

export default {
    mixins: [HandlesValidationErrors, FormField],

    data: () => ({
        fullScreen: false,
        codemirror: null,
        mode: 'write',
        tools: [
            { name: 'bold', action: 'bold', className: 'fa fa-bold' },
            {
                name: 'italicize',
                action: 'italicize',
                className: 'fa fa-italic',
            },
            { name: 'link', action: 'link', className: 'fa fa-link' },
            { name: 'image', action: 'image', className: 'fa fa-image' },
            {
                name: 'fullScreen',
                action: 'toggleFullScreen',
                className: 'fa fa-expand',
            },
        ],
    }),

    mounted() {
        this.codemirror = CodeMirror.fromTextArea(this.$refs.theTextarea, {
            tabSize: 4,
            indentWithTabs: true,
            lineWrapping: true,
            mode: 'markdown',
            extraKeys: {
                Enter: 'newlineAndIndentContinueMarkdownList',
                ..._.map(this.tools, tool => {
                    return tool.action
                }),
            },
        })

        _.each(keyMaps, (action, map) => {
            const realMap = map.replace(
                'Cmd-',
                CodeMirror.keyMap['default'] == CodeMirror.keyMap.macDefault ? 'Cmd-' : 'Ctrl-'
            )

            this.codemirror.options.extraKeys[realMap] = actions[keyMaps[map]].bind(this)
        })

        this.doc.on('change', (cm, changeObj) => {
            this.value = cm.getValue()
        })

        this.doc.setValue(this.field.value)
    },

    methods: {
        focus() {
            this.codemirror.focus()
        },

        write() {
            this.mode = 'write'
            this.codemirror.refresh()
        },

        preview() {
            this.mode = 'preview'
        },

        insert(insertion) {
            this.doc.replaceRange(insertion, {
                line: this.cursor.line,
                ch: this.cursor.ch,
            })
        },

        insertAround(start, end) {
            if (this.doc.somethingSelected()) {
                const selection = this.doc.getSelection()
                this.doc.replaceSelection(start + selection + end)
            } else {
                this.doc.replaceRange(start + end, {
                    line: this.cursor.line,
                    ch: this.cursor.ch,
                })
                this.doc.setCursor({
                    line: this.cursor.line,
                    ch: this.cursor.ch - end.length,
                })
            }
        },

        insertBefore(insertion, cursorOffset) {
            if (this.doc.somethingSelected()) {
                const selects = this.doc.listSelections()
                selects.forEach(selection => {
                    const pos = [selection.head.line, selection.anchor.line].sort()

                    for (let i = pos[0]; i <= pos[1]; i++) {
                        this.doc.replaceRange(insertion, { line: i, ch: 0 })
                    }

                    this.doc.setCursor({ line: pos[0], ch: cursorOffset || 0 })
                })
            } else {
                this.doc.replaceRange(insertion, {
                    line: this.cursor.line,
                    ch: 0,
                })
                this.doc.setCursor({
                    line: this.cursor.line,
                    ch: cursorOffset || 0,
                })
            }
        },

        callAction(action) {
            this.focus()
            actions[action].call(this)
        },
    },

    computed: {
        doc() {
            return this.codemirror.getDoc()
        },

        cursor() {
            return this.doc.getCursor()
        },

        rawContent() {
            return this.codemirror.getValue()
        },

        previewContent() {
            return marked(this.rawContent)
        },
    },
}
</script>

<template>
    <field-wrapper>
        <div class="w-1/5 px-8 py-6">
            <slot>
                <form-label :for="field.name">
                    {{ field.name }}
                </form-label>
            </slot>
        </div>
        <div class="w-4/5 px-8 py-6">
            <div class="bg-white rounded-lg" :class="{
                'fixed pin z-50': fullScreen,
                'form-input form-input-bordered px-0': ! fullScreen,
                'border-danger': errors.has('body'),
            }">
                <header class="flex items-center content-center justify-between border-b border-60">
                    <ul class="w-full flex items-center content-center list-reset">
                        <button :class="{'text-primary font-bold' : this.mode == 'write'}" @click.prevent="write" class="ml-1 text-90 px-3 py-2">Write</button>
                        <button :class="{'text-primary font-bold' : this.mode == 'preview'}" @click.prevent="preview" class="text-90 px-3 py-2">Preview</button>
                    </ul>
                    <ul class="flex items-center list-reset">
                        <button :key="tool.action" @click.prevent="callAction(tool.action)" v-for="tool in tools" class="rounded-none ico-button inline-block px-2 text-sm text-80 border-l border-60">
                            <i :class="tool.className"></i>
                        </button>
                    </ul>
                </header>

                <div class="p-4">
                    <div v-show="mode == 'write'">
                        <textarea ref="theTextarea"></textarea>
                    </div>
                    <div class="markdown" v-if="mode == 'preview'" v-html="previewContent"></div>
                </div>
            </div>

            <p v-if="hasError" class="my-2 text-danger">
                {{ firstError }}
            </p>
        </div>
    </field-wrapper>
</template>

<style src="codemirror/lib/codemirror.css" />

<style>
.ico-button {
    width: 35px;
    height: 35px;
}

.ico-button:hover {
    color: var(--primary);
}

.ico-button:active {
    color: var(--brand-80);
}

.cm-fat-cursor .CodeMirror-cursor {
    background: #000;
}

.cm-s-default .cm-header {
    color: black;
}
.cm-s-default .cm-link {
    color: var(--primary);
}
.CodeMirror-line {
    color: var(--gray-60);
}
.cm-s-default .cm-variable-2 {
    color: var(--gray-60);
}
.cm-s-default .cm-quote {
    color: var(--gray-60);
}
.cm-s-default .cm-comment {
    color: var(--gray-60);
}
.cm-s-default .cm-string {
    color: var(--gray-40);
}
.cm-s-default .cm-url {
    color: var(--gray-40);
}

.CodeMirror {
    height: auto;
    min-height: 50px;
    font: 14px/1.5 Menlo, Consolas, Monaco, 'Andale Mono', monospace;
    box-sizing: border-box;
    height: auto;
    margin: auto;
    position: relative;
    z-index: 0;
}

.CodeMirror-scroll {
    height: auto;
    overflow: visible;
    box-sizing: border-box;
}

/* Fullscreen Mode */
:-webkit-full-screen {
    width: 100%;
    height: 100%;
}

:-moz-full-screen .CodeMirror-scroll {
    height: 100%;
    overflow: scroll;
}

:-webkit-full-screen .CodeMirror-scroll {
    height: 100%;
    overflow: scroll;
}
</style>
