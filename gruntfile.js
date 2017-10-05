module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    
    ts: {
      app: {
        files: [{
          src: [
            "./src/index.ts"
          ],
          dest: "./dist"
        },],
        tsconfig: {
          tsconfig: './tsconfig.json',
          updateFiles: true
        }
      },

      tasks: {
        files: [{
          src: [
            "./src/tasks/**/*.ts"
          ],
          dest: "./tasks"
        },],
        options: {
          rootDir: "./src/tasks",
        },
        tsconfig: {
          tsconfig: './tsconfig.json',
          updateFiles: true
        }
      },

      test: {
        files: [{
          src: [
            "./test/**/*.ts", 
            "!./test/src/expected/**" 
          ],
          dest: "./test/dist"
        },],
        tsconfig: {
          tsconfig: './tsconfig.json',
          updateFiles: true
        }
      }
    },

    clean: {
      app: ['./dist', './tasks'],
      test: ['./test/dist']
    },
    
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: [
          "./src/\*\*/\*.ts",
          "./test/src/\*\*/\*.ts",
          "!./test/src/expected/**"
        ]
      }
    },

    mochaTest: {
      test: {
        options: {
          log: true,
          run: true
        },
        src: ['./test/**/*.js']
      },
    },

    copy: {
      template:{
        expand: true,
        cwd: './src/tasks',
        src: ['**/*.njk'],
        dest: './tasks'
      },
      templateToSrc:{
        expand: true,
        cwd: './src/tasks',
        src: ['**/*.njk'],
        dest: './test/dist/src/tasks'
      }
    },

  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask("build", [
    "clean:app", "ts:app", "ts:tasks", "tslint", "copy:template","copy:templateToSrc"
  ]);

  grunt.registerTask("test", [
    "clean:test","copy:templateToSrc", "ts:test",  "mochaTest"
  ]); 

};