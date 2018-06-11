<template>
    <field-wrapper>
        <div class="w-1/5 px-8 py-6">
            <form-label>
                {{ field.name }}
            </form-label>
        </div>

        <div class="w-4/5 px-8 py-6">
            <div class="form-input form-input-bordered px-0 overflow-hidden">
                <textarea ref="theTextarea" />
            </div>

            <p v-if="hasError" class="my-2 text-danger">
                {{ firstError }}
            </p>
        </div>
    </field-wrapper>
</template>

<style src="codemirror/lib/codemirror.css" />
<style src="codemirror/theme/dracula.css" />

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import { FormField, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [HandlesValidationErrors, FormField],

    data() {
        return {
            codemirror: null,
        }
    },

    /**
     * Mount the component.
     */
    mounted() {
        this.codemirror = CodeMirror.fromTextArea(this.$refs.theTextarea, {
            tabSize: 4,
            indentWithTabs: true,
            lineWrapping: true,
            lineNumbers: true,
            theme: 'dracula',
            mode: 'application/json',
        })

        this.doc.on('change', (cm, changeObj) => {
            this.value = cm.getValue()
        })

        this.doc.setValue(this.field.value)
    },

    computed: {
        doc() {
            return this.codemirror.getDoc()
        },
    },
}
</script>

<style>
.CodeMirror {
    min-height: 50px;
    font: 14px/1.5 Menlo, Consolas, Monaco, 'Andale Mono', monospace;
    box-sizing: border-box;
    height: auto;
    margin: auto;
    position: relative;
    z-index: 0;
}

.CodeMirror-wrap {
    padding: 0.5rem;
}

.CodeMirror-scroll {
    height: auto;
    overflow: visible;
    box-sizing: border-box;
}
</style>
