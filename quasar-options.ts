export const quasarOptions = {
  plugins: [
    'BottomSheet',
    'Dialog',
    'Loading',
    'LoadingBar',
    'Notify',
    'Dark',
  ],

  components: {
    defaults: {
      QBtn: {
        unelevated: true,
        noCaps: true,
      },
    },
  },

  config: {
    loading: {
      message: 'Carregando...',
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'white',
    },

    notify: {
      position: 'top',
      timeout: 2500,
    },
  },
}