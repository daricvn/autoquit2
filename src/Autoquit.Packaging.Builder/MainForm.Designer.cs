
namespace Autoquit.Packaging.Builder
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.txtPath = new System.Windows.Forms.TextBox();
            this.btnBrowse = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.lstReferenceList = new System.Windows.Forms.ListBox();
            this.btnAdd = new System.Windows.Forms.Button();
            this.btnRemove = new System.Windows.Forms.Button();
            this.btnPackage = new System.Windows.Forms.Button();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.btnSave = new System.Windows.Forms.Button();
            this.lstAlibContent = new System.Windows.Forms.ListBox();
            this.label3 = new System.Windows.Forms.Label();
            this.btnAlibBrowse = new System.Windows.Forms.Button();
            this.txtAlibPath = new System.Windows.Forms.TextBox();
            this.dllBrowser = new System.Windows.Forms.OpenFileDialog();
            this.alibBrowser = new System.Windows.Forms.OpenFileDialog();
            this.folderBrowser = new System.Windows.Forms.FolderBrowserDialog();
            this.lstMap = new System.Windows.Forms.ListBox();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(14, 19);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(57, 15);
            this.label1.TabIndex = 0;
            this.label1.Text = "Main DLL";
            // 
            // txtPath
            // 
            this.txtPath.Location = new System.Drawing.Point(77, 16);
            this.txtPath.Name = "txtPath";
            this.txtPath.Size = new System.Drawing.Size(410, 23);
            this.txtPath.TabIndex = 1;
            // 
            // btnBrowse
            // 
            this.btnBrowse.Location = new System.Drawing.Point(493, 12);
            this.btnBrowse.Name = "btnBrowse";
            this.btnBrowse.Size = new System.Drawing.Size(100, 29);
            this.btnBrowse.TabIndex = 2;
            this.btnBrowse.Text = "Browse";
            this.btnBrowse.UseVisualStyleBackColor = true;
            this.btnBrowse.Click += new System.EventHandler(this.btnBrowse_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(14, 56);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(64, 15);
            this.label2.TabIndex = 3;
            this.label2.Text = "References";
            // 
            // lstReferenceList
            // 
            this.lstReferenceList.FormattingEnabled = true;
            this.lstReferenceList.HorizontalScrollbar = true;
            this.lstReferenceList.ItemHeight = 15;
            this.lstReferenceList.Location = new System.Drawing.Point(84, 56);
            this.lstReferenceList.Name = "lstReferenceList";
            this.lstReferenceList.SelectionMode = System.Windows.Forms.SelectionMode.MultiExtended;
            this.lstReferenceList.Size = new System.Drawing.Size(403, 184);
            this.lstReferenceList.TabIndex = 4;
            // 
            // btnAdd
            // 
            this.btnAdd.Location = new System.Drawing.Point(493, 56);
            this.btnAdd.Name = "btnAdd";
            this.btnAdd.Size = new System.Drawing.Size(100, 29);
            this.btnAdd.TabIndex = 5;
            this.btnAdd.Text = "Add";
            this.btnAdd.UseVisualStyleBackColor = true;
            this.btnAdd.Click += new System.EventHandler(this.btnAdd_Click);
            // 
            // btnRemove
            // 
            this.btnRemove.Location = new System.Drawing.Point(493, 91);
            this.btnRemove.Name = "btnRemove";
            this.btnRemove.Size = new System.Drawing.Size(100, 29);
            this.btnRemove.TabIndex = 6;
            this.btnRemove.Text = "Remove";
            this.btnRemove.UseVisualStyleBackColor = true;
            this.btnRemove.Click += new System.EventHandler(this.btnRemove_Click);
            // 
            // btnPackage
            // 
            this.btnPackage.Location = new System.Drawing.Point(237, 251);
            this.btnPackage.Name = "btnPackage";
            this.btnPackage.Size = new System.Drawing.Size(139, 42);
            this.btnPackage.TabIndex = 7;
            this.btnPackage.Text = "Build Package";
            this.btnPackage.UseVisualStyleBackColor = true;
            this.btnPackage.Click += new System.EventHandler(this.btnPackage_Click);
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Location = new System.Drawing.Point(12, 12);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(613, 335);
            this.tabControl1.TabIndex = 9;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.lstReferenceList);
            this.tabPage1.Controls.Add(this.btnPackage);
            this.tabPage1.Controls.Add(this.label2);
            this.tabPage1.Controls.Add(this.label1);
            this.tabPage1.Controls.Add(this.btnBrowse);
            this.tabPage1.Controls.Add(this.btnRemove);
            this.tabPage1.Controls.Add(this.btnAdd);
            this.tabPage1.Controls.Add(this.txtPath);
            this.tabPage1.Location = new System.Drawing.Point(4, 24);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(605, 307);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "Build";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.lstMap);
            this.tabPage2.Controls.Add(this.btnSave);
            this.tabPage2.Controls.Add(this.lstAlibContent);
            this.tabPage2.Controls.Add(this.label3);
            this.tabPage2.Controls.Add(this.btnAlibBrowse);
            this.tabPage2.Controls.Add(this.txtAlibPath);
            this.tabPage2.Location = new System.Drawing.Point(4, 24);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(605, 307);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "Extract";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // btnSave
            // 
            this.btnSave.Location = new System.Drawing.Point(230, 264);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(146, 37);
            this.btnSave.TabIndex = 7;
            this.btnSave.Text = "Save to Folder";
            this.btnSave.UseVisualStyleBackColor = true;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // lstAlibContent
            // 
            this.lstAlibContent.FormattingEnabled = true;
            this.lstAlibContent.HorizontalScrollbar = true;
            this.lstAlibContent.ItemHeight = 15;
            this.lstAlibContent.Location = new System.Drawing.Point(14, 41);
            this.lstAlibContent.Name = "lstAlibContent";
            this.lstAlibContent.SelectionMode = System.Windows.Forms.SelectionMode.None;
            this.lstAlibContent.Size = new System.Drawing.Size(295, 214);
            this.lstAlibContent.TabIndex = 6;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(14, 15);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(49, 15);
            this.label3.TabIndex = 3;
            this.label3.Text = "Alib File";
            // 
            // btnAlibBrowse
            // 
            this.btnAlibBrowse.Location = new System.Drawing.Point(493, 8);
            this.btnAlibBrowse.Name = "btnAlibBrowse";
            this.btnAlibBrowse.Size = new System.Drawing.Size(100, 29);
            this.btnAlibBrowse.TabIndex = 5;
            this.btnAlibBrowse.Text = "Browse";
            this.btnAlibBrowse.UseVisualStyleBackColor = true;
            this.btnAlibBrowse.Click += new System.EventHandler(this.btnAlibBrowse_Click);
            // 
            // txtAlibPath
            // 
            this.txtAlibPath.Location = new System.Drawing.Point(77, 12);
            this.txtAlibPath.Name = "txtAlibPath";
            this.txtAlibPath.Size = new System.Drawing.Size(410, 23);
            this.txtAlibPath.TabIndex = 4;
            // 
            // dllBrowser
            // 
            this.dllBrowser.Filter = "DLL files|*.dll";
            // 
            // alibBrowser
            // 
            this.alibBrowser.Filter = "Autoquit Module files|*.alib";
            // 
            // lstMap
            // 
            this.lstMap.FormattingEnabled = true;
            this.lstMap.HorizontalScrollbar = true;
            this.lstMap.ItemHeight = 15;
            this.lstMap.Location = new System.Drawing.Point(315, 41);
            this.lstMap.Name = "lstMap";
            this.lstMap.SelectionMode = System.Windows.Forms.SelectionMode.None;
            this.lstMap.Size = new System.Drawing.Size(284, 214);
            this.lstMap.TabIndex = 8;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(638, 361);
            this.Controls.Add(this.tabControl1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "MainForm";
            this.Text = "Autoquit Module Packaging";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.tabPage2.ResumeLayout(false);
            this.tabPage2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtPath;
        private System.Windows.Forms.Button btnBrowse;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ListBox lstReferenceList;
        private System.Windows.Forms.Button btnAdd;
        private System.Windows.Forms.Button btnRemove;
        private System.Windows.Forms.Button btnPackage;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.OpenFileDialog dllBrowser;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btnAlibBrowse;
        private System.Windows.Forms.TextBox txtAlibPath;
        private System.Windows.Forms.OpenFileDialog alibBrowser;
        private System.Windows.Forms.ListBox lstAlibContent;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.FolderBrowserDialog folderBrowser;
        private System.Windows.Forms.ListBox lstMap;
    }
}

