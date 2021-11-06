using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Forms;

namespace Autoquit.Packaging.Builder
{
    public partial class MainForm : Form
    {
        private IList<string> referencePaths = new BindingList<string>();
        public MainForm()
        {
            InitializeComponent();
        }

        private void BindControls()
        {
            dllBrowser.FileOk += DllBrowser_FileOk;
            lstReferenceList.DataSource = referencePaths;
            lstReferenceList.SelectedIndexChanged += LstReferenceList_SelectedIndexChanged;
        }

        private void UpdateButton()
        {
            btnAdd.Enabled = !string.IsNullOrEmpty(txtPath.Text);
            btnRemove.Enabled = lstReferenceList.SelectedIndices.Count > 0;
            btnPackage.Enabled = !string.IsNullOrEmpty(txtPath.Text) && System.IO.File.Exists(txtPath.Text);
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            BindControls();
            UpdateButton();
        }

        private void btnBrowse_Click(object sender, EventArgs e)
        {
            dllBrowser.Multiselect = false;
            dllBrowser.Tag = txtPath;
            dllBrowser.ShowDialog();
        }

        private IEnumerable<int> GetSelectedIndices()
        {
            foreach (int indice in lstReferenceList.SelectedIndices)
                yield return indice;
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            dllBrowser.Multiselect = true;
            dllBrowser.Tag = lstReferenceList;
            dllBrowser.ShowDialog();
        }

        private void btnRemove_Click(object sender, EventArgs e)
        {
            if (lstReferenceList.SelectedIndices.Count == 0)
                return;
            if (MessageBox.Show("Are you sure want to remove these item(s)?", "Confirmation", MessageBoxButtons.YesNo) == DialogResult.No)
                return;
            var selectedIndexes = new List<int>(GetSelectedIndices());
            for (var i = selectedIndexes.Count - 1; i >= 0; i--)
            {
                var path = lstReferenceList.Items[selectedIndexes[i]]?.ToString();
                if (path == null)
                    continue;
                referencePaths.Remove(path);
            }
        }

        private void DllBrowser_FileOk(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (dllBrowser.Tag is TextBox txt)
                txt.Text = dllBrowser.FileName;
            else if (dllBrowser.Tag is ListBox lst)
            {
                foreach (var path in dllBrowser.FileNames)
                    if (!referencePaths.Contains(path))
                    {
                        if (path.Equals(txtPath.Text, StringComparison.OrdinalIgnoreCase))
                        {
                            MessageBox.Show("Cannot add main dll as referenced dll", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            return;
                        }
                        referencePaths.Add(path);
                    }
                lst.Update();
            }
            UpdateButton();
        }

        private void LstReferenceList_SelectedIndexChanged(object sender, EventArgs e)
        {
            UpdateButton();
        }

        private void btnAlibBrowse_Click(object sender, EventArgs e)
        {
            alibBrowser.ShowDialog();
        }
    }
}
